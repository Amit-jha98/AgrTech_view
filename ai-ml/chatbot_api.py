from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
<<<<<<< HEAD
from chatbot_model import get_chatbot_response  # Now properly exported

app = FastAPI()

=======
from chatbot_model import get_chatbot_response

app = FastAPI()

# Define Pydantic model to parse the request body
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
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
<<<<<<< HEAD
async def chatbot_endpoint(request: QueryRequest):
    try:
        response = get_chatbot_response(request.query)
        return {"reply": response}
    except Exception as e:
        return {"reply": f"Error processing request: {str(e)}"}
=======
async def chatbot(request: QueryRequest):
    response = get_chatbot_response(request.query)
    
    # Log the response to the console
    print(f"Chatbot response: {response}")
    
    return {"reply": response}
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
