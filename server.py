from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
from fastapi.responses import JSONResponse
# from transformers import pipeline

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
# summarizer = pipeline("summarization",model="facebook/bart-large-cnn",device=-1)  
model = whisper.load_model("small")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST","GET"],
    allow_headers=["*"],
)

#mumken nekhtar medium aw large

@app.post("/whisper/")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
       
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(await file.read())
        
        
        result = model.transcribe(
            temp_file_path, 
            task="translate",  
            fp16=False  
        )
        
       
        os.remove(temp_file_path)
    


        ARTICLE=result["text"]
        # fnl = summarizer(ARTICLE, max_length=130, min_length=30, do_sample=False)
        # print(fnl)
        print(ARTICLE)
        return JSONResponse(content={
            # "transcription": fnl[0]["summary_text"],    
            "transcription": result["text"],    
            # "detected_language": result.get("language", "Unknown")
        })
    
    except Exception as e:
        # Handle any errors during transcription
        return JSONResponse(
            content={"error": str(e)}, 
            status_code=500
        )


import os
import uvicorn
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port) 