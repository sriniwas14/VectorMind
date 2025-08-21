from sqlalchemy import ForeignKey, String, DateTime, func, Enum as SQLEnum
from enum import Enum
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Integer
from app.models.base import Base

class MsgFrom(Enum):
    human = "human"
    ai = "ai"

class Chat(Base):
    __tablename__ = "chats"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    last_updated: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    messages: Mapped[list["Message"]] = relationship(
        "Message", back_populates="chat", cascade="all, delete-orphan"
    )

class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    chat_id: Mapped[int] = mapped_column(ForeignKey("chats.id", ondelete="CASCADE"))
    content: Mapped[str] = mapped_column(String, nullable=False)
    msg_from: Mapped[MsgFrom] = mapped_column(SQLEnum(MsgFrom, name="msg_from"), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    chat: Mapped[Chat] = relationship("Chat", back_populates="messages")

