from app.models.chat import Message, MsgFrom
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage
from typing import List, Any 
from app.utils.db import SessionMaker

db = SessionMaker()

def get_chat_context(chat_id: int) -> List[BaseMessage]:
    messages = [] 
    msgs = db.query(Message).filter(Message.chat_id == chat_id).order_by(Message.created_at.desc()).limit(10).all()
    db.flush()

    for m in msgs:
        if m.msg_from == MsgFrom.human:
            messages.append(HumanMessage(content=m.content))
        else:
            messages.append(AIMessage(content=m.content))

    return messages

def get_string_response(response : str | list[str | dict[Any, Any]]) -> str:
    if isinstance(response, str):
        return response

    if isinstance(response, List):
        first = response[0]
        if isinstance(first, dict):
            return ""
        return first
        
