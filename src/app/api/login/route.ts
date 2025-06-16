import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Certifique-se de definir uma variável de ambiente segura para o segredo JWT

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    // Validação simples dos campos
    if (!username || !password) {
        return NextResponse.json({ error: "Preencha todos os campos" }, { status: 400 });
    }

    // Verifica se o usuário existe e se a senha está correta
    const user = await prisma.usuarios.findUnique({ where: { username } });
    if (!user || user.password !== password) {
        return NextResponse.json({ error: "Usuário ou senha inválidos" }, { status: 401 });
    }

    // Gera o token JWT com duração de 1 hora
    const token = jwt.sign({ username: user.username, id: user.id}, JWT_SECRET, {expiresIn: "1h"});


    // Define o token no cookie
    const response = NextResponse.json({ message: "Login realizado com sucesso" });
    response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60, // 1 hora
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    });
    
    return response;
}