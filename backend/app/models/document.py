from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import declarative_base
import enum
from sqlalchemy import Enum

Base = declarative_base()


class DocumentType(enum.Enum):
    text = "text"
    csv = "csv"
    pdf = "pdf"
    excel = "excel"


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    type = Column(Enum(DocumentType), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

