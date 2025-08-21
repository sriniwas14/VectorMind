from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_new_chat():
    response = client.post("/chats/", json={ "message": "Hi There!" })
    assert response.status_code == 200
    assert "chat_id" in response.json()

def test_chat_response():
    response = client.post("/chats/1", json={ "message": "What's up!" })
    assert response.status_code == 200
    assert "message" in response.json()

def test_get_chats():
    response = client.get("/chats/")
    assert response.status_code == 200
