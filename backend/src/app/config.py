import os

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()


class Settings(BaseModel):
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg://USER:PASSWORD@localhost:5432/DATABASE_NAME",
    )


settings = Settings()
