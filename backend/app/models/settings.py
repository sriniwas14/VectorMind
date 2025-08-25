from sqlalchemy import Column, Integer, String, DateTime, func
import enum
from sqlalchemy import Enum
from app.models.base import Base


class ModelProvider(enum.Enum):
    openai = "openai"
    groq = "groq"
    ollama = "ollama"

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    # Models
    provider = Column(Enum(ModelProvider), nullable=False)
    groq_api_key = Column(String, nullable=True)
    openai_api_key = Column(String, nullable=True)
    ollama_model = Column(String, nullable=True)
    groq_model = Column(String, nullable=True)
    opeanai_model = Column(String, nullable=True)


