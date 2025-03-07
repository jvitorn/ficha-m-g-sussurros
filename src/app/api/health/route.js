// app/api/health/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// GET /api/health - Verifica se a API está de Pé
export async function GET() {
  try {
    const db = await connectToDatabase();
    await db.command({ ping: 1 }); // Testa a conexão
    
    return NextResponse.json({
      status: 'online',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'degraded',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}