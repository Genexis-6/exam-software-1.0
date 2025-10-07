from Main.config import settings
import uvicorn


if __name__ == "__main__":
    uvicorn.run(
        app=settings.APP,
        reload=settings.DEBUG,
        port=settings.PORT
    )