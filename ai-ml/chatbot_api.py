from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot_model import get_chatbot_response  # Now properly exported

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

# CORS settings
origins = [
    "http://localhost:3001",  # Frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chatbot")
async def chatbot_endpoint(request: QueryRequest):
    try:
        response = get_chatbot_response(request.query)
        return {"reply": response}
    except Exception as e:
        return {"reply": f"Error processing request: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
