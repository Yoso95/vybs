from pydantic import BaseModel


class AccountIn(BaseModel):
    username: str
    password: str
    full_name: str
    email: str
    avatar: str


class AccountOut(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    avatar: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str
