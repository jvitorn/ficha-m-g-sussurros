// app/api/test/route.js
import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const jsonEnviado = await request.json()
    console.log(jsonEnviado)
    NextResponse.json({dados: "sucesso nessa req"},{status:200})
  } catch (error) {
    return NextResponse.json({error: "Erro ao fazer essa req"},{status:500});
  }
}