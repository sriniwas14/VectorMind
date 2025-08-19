from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter();

class NewChatReq(BaseModel):
    message: str

class ChatReq(BaseModel):
    message: str


class ChatRes(BaseModel):
    message: str

class ChatListRes(BaseModel):
    chats: List[int] 

class NewChatRes(BaseModel):
    chat_id: int
    message: str

@router.post("/", response_model=NewChatRes)
def create_chat(payload: NewChatReq):
    pass 

@router.post("/{chat_id}", response_model=ChatRes)
def get_response(chat_id: int, payload: ChatReq):
    pass


@router.get("/", response_model=ChatListRes)
def get_chats():
    pass
