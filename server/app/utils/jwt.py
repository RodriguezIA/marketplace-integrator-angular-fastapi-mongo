import jwt
from passlib.hash import sha256_crypt

def encode(password: str):
    return sha256_crypt.hash(password)

def decode(password: str, hashPassword: str):
    return sha256_crypt.verify(password, hashPassword)
