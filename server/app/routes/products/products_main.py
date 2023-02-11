from fastapi import Router

router = Router(
    prefix = "/items"
)

@router.get("/")
def products_main():
    return (
        {"hello": "world"}
    )