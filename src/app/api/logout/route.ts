import { NextResponse } from "next/server";

export async function POST(){
    const response = NextResponse.json({ message: "Logout realizado com sucesso!" }, { status: 200 });
    response.cookies.delete('token'); // Remove o cookie de autenticação
    return response;
}