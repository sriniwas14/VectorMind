from datetime import time
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter();

class Doc(BaseModel):
    id: int
    filename: str
    created_at: time

class ListDocsReq(BaseModel):
    docs: List[Doc]     

@router.get("/")
def get_docs():
    pass

@router.get("/{doc_id}")
def get_single_doc(doc_id: int):
    pass

@router.delete("/{doc_id}")
def delete_doc(doc_id: int):
    pass
