from fastapi import FastAPI

router = Router(
    prefix = "/items"
)

@router.get("/")
def products_main():
    return (
        {"hello": "world"}
    )