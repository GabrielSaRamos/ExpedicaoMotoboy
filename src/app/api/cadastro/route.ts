import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json({ message: "Preencha todos os campos" }, { status: 400 });
    }

    try {
        // Verifica se já existe usuário
        const exists = await prisma.usuarios.findUnique({ where: { username } });
        if (exists) {
            return NextResponse.json({ message: "Usuário já existe" }, { status: 409 });
        }

        console.log("Recebendo dados:", { username, password });
        await prisma.usuarios.create({
            data: { username, password }
        });

        return NextResponse.json({ message: "Usuário cadastrado com sucesso!" }, { status: 201 });
     
    } catch (error) {
        return NextResponse.json({ message: "Erro ao criar usuário" }, { status: 500 });
    }
}
