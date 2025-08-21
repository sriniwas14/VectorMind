from sqlalchemy import create_engine 
from sqlalchemy.orm import declarative_base, sessionmaker
from app.models import chat, document, base

engine = create_engine("postgresql://postgres:mysecretpassword@localhost:5432/vectormind")
base.Base.metadata.create_all(bind=engine)
SessionMaker = sessionmaker(bind=engine)
