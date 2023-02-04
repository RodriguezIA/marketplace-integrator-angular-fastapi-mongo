from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root_app():
    return {"welcome to root endpoint in server side"}