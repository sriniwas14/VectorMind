import enum


MODEL_PROVIDERS = ["ollama", "openai", "groq"]

class ModelProviders(enum.Enum):
    ollama = "ollama"
    openai = "openai"
    groq = "groq"

