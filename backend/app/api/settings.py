from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from app.utils.db import SessionMaker
from backend.app.data import providers
from typing import Optional

from backend.app.models.settings import Settings

db = SessionMaker()
router = APIRouter();

class NewSettingsReq(BaseModel):
    provider: providers.ModelProviders
    openai_api_key: Optional[str]
    groq_api_key: Optional[str]

class NewSettingsRes(BaseModel):
    provider: providers.ModelProviders

@router.post("/", response_model=NewSettingsRes)
def save_settings(payload: NewSettingsReq):
    settings = Settings(provider=payload.provider, openai_api_key=payload.openai_api_key, groq_api_key=payload.groq_api_key) 
    db.add(settings)
    db.commit()
    db.flush()

    return { "settings": NewSettingsRes(provider=payload.provider) }
