from sqlalchemy import create_engine 
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine("postgresql://postgres:mysecretpassword@localhost:5432/vectormind")
Base = declarative_base()
db = sessionmaker(bind=engine)
