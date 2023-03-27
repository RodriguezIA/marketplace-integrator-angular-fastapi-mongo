# los modelos sirven para saber que se recibira del front

from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id: Optional[str]
    name: str
    email:  str
    password: str
    role:  Optional[str]

class UserLogin(BaseModel):
    email: str
    password: str
