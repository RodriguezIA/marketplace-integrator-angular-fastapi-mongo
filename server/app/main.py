from fastapi import FastAPI
from .routes.user import user
from .docs import tags_metadata

app = FastAPI()

app.include_router(user, prefix='/user')