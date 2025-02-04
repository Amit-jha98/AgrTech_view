from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot_model import get_chatbot_response

app = FastAPI()

# Define Pydantic model to parse the request body
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
async def chatbot(request: QueryRequest):
    response = get_chatbot_response(request.query)
    
    # Log the response to the console
    print(f"Chatbot response: {response}")
    
    return {"reply": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
