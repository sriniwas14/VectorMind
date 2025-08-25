from dotenv import load_dotenv
from app.data.providers import ModelProviders
load_dotenv()
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage
from langchain_groq import ChatGroq
from langchain_community.chat_models import ollama, openai
from typing import List
import ollama as ol
from openai import OpenAI
from app.core.config import OPENAI_API_KEY

system_prompt = SystemMessage(content="You are a helpful and friendly assistant")

class AiModel():
    def __init__(self, provider: ModelProviders, model: str, temperature: float):
        if provider == ModelProviders.groq:
            self.model = ChatGroq(
                model=model,
                temperature=temperature
            )
        elif provider == ModelProviders.ollama:
            self.model = ollama.ChatOllama(model=model, temperature=temperature)
        elif provider == ModelProviders.openai:
            self.model = openai.ChatOpenAI(model=model, temperature=temperature)
        pass

    def generate(self, prompt: str, ctx: List[BaseMessage]) -> BaseMessage:
        p = [system_prompt, *ctx, HumanMessage(content=prompt)]
        result = self.model.invoke(p)
        return result

class ModelListItem:
    def __init__(self, value: str, label: str):
        self.value = value
        self.label = label

def get_models(provider: ModelProviders) -> list[ModelListItem]:
    if provider == ModelProviders.ollama:
        ml = ol.list()
        models = [ModelListItem(m.model or "", m.model or "Invalid option") for m in ml.models]
        return models
    elif provider == ModelProviders.openai:
        client = OpenAI(api_key=OPENAI_API_KEY) 
        ml= client.models.list()
        models = [ModelListItem(m.id or "", m.id or "Invalid option") for m in ml]

        return []
    elif provider == ModelProviders.groq:
        return []
    return []
