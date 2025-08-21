from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat, document

app = FastAPI()

@asynccontextmanager
async def setup():
    ## Add which needs to be invoked at startup
    print("Bootstrapping...")
    yield

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chat.router, prefix="/chats")
app.include_router(document.router, prefix="/documents")

