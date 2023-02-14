from fastapi import FastAPI
from .routes.products import products_main

app = FastAPI()

@app.get("/")
def root_app():
    return {"welcome to root endpoint in server side test"}

app.include_router(products_main.router)