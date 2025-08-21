from dotenv import load_dotenv
load_dotenv()
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage
import enum
from langchain_groq import ChatGroq
from langchain_community.chat_models import ollama, openai
from typing import List

system_prompt = SystemMessage(content="You are a helpful and friendly assistant")
class ModelProvider(enum.Enum):
    open_ai = "openai"
    groq = "groq"
    ollama = "ollama"

class AiModel():
    def __init__(self, provider: ModelProvider, model: str, temperature: float):
        if provider == ModelProvider.groq:
            self.model = ChatGroq(
                model=model,
                temperature=temperature
            )
        elif provider == ModelProvider.ollama:
            self.model = ollama.ChatOllama(model=model, temperature=temperature)
        elif provider == ModelProvider.open_ai:
            self.model = openai.ChatOpenAI(model=model, temperature=temperature)
        pass

    def generate(self, prompt: str, ctx: List[BaseMessage]) -> BaseMessage:
        p = [system_prompt, *ctx, HumanMessage(content=prompt)]
        result = self.model.invoke(p)
        return result

