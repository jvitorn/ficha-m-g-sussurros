// app/api/test/route.js
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collections = await db.listCollections().toArray();
    return new Response(JSON.stringify(collections), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), { status: 500 });
  }
}