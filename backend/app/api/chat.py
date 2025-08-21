from datetime import datetime
from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from typing import List
from app.utils.db import SessionMaker
from app.models.chat import Chat, Message, MsgFrom
from app.services.ai import AiModel, ModelProvider
from app.utils.helpers import get_chat_context, get_string_response

db = SessionMaker()
router = APIRouter();
model = AiModel(provider=ModelProvider.groq, model="llama-3.1-8b-instant", temperature=0.7)

class NewChatReq(BaseModel):
    message: str

class ChatReq(BaseModel):
    message: str


class ChatRes(BaseModel):
    message: str

class ChatBody(BaseModel):
    id: int
    title: str
    last_updated: datetime
    created_at: datetime

class ChatListRes(BaseModel):
    chats: List[ChatBody] 

class NewChatRes(BaseModel):
    chat_id: int
    message: str

@router.post("/", response_model=NewChatRes)
def create_chat(payload: NewChatReq):
    new_chat = Chat(title=payload.message[0:10])

    msg = Message(content=payload.message, msg_from=MsgFrom.human)
    new_chat.messages.append(msg)
    # db.add(msg)

    response = model.generate(payload.message, [])
    ai_msg = Message(content=get_string_response(response.content), msg_from=MsgFrom.ai)
    # db.add(ai_msg)
    new_chat.messages.append(ai_msg)
    
    db.add(new_chat)
    db.commit()


    return NewChatRes(chat_id=new_chat.id, message=get_string_response(response.content))

@router.post("/{chat_id}", response_model=ChatRes)
def get_response(chat_id: int, payload: ChatReq):
    c = db.get(Chat, chat_id)

    if c == None:
        raise HTTPException(status_code=404, detail="can't find the chat you're looking for")

    ctx = get_chat_context(c.id)
    
    msg = Message(content=payload.message, msg_from=MsgFrom.human, chat_id=chat_id)

    response = model.generate(payload.message, ctx)
    ai_msg = Message(content=get_string_response(response.content), msg_from=MsgFrom.ai, chat_id=chat_id)
    db.add_all([msg, ai_msg])
    db.commit()

    return ChatRes(message=get_string_response(response.content))

@router.get("/", response_model=ChatListRes)
def get_chats():  
    chats = db.query(Chat).order_by(Chat.last_updated).limit(10).all()

    return { "chats": chats }



