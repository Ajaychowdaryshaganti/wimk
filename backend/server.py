from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

class ContactLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    school_name: str
    contact_person: str
    email: str
    phone: str
    message: Optional[str] = ""
    request_type: str = "contact"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactLeadCreate(BaseModel):
    school_name: str
    contact_person: str
    email: str
    phone: str
    message: Optional[str] = ""
    request_type: str = "contact"

@api_router.get("/")
async def root():
    return {"message": "Where Is My Kid API"}

@api_router.post("/leads", response_model=ContactLead)
async def create_lead(input: ContactLeadCreate):
    lead_obj = ContactLead(**input.model_dump())
    doc = lead_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_leads.insert_one(doc)
    return lead_obj

@api_router.get("/leads", response_model=List[ContactLead])
async def get_leads():
    leads = await db.contact_leads.find({}, {"_id": 0}).to_list(1000)
    for lead in leads:
        if isinstance(lead['created_at'], str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
