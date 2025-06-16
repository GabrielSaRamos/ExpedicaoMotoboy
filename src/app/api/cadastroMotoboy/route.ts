import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const motoboys = await prisma.motoboy.findMany();
        // Mapeia os campos para os nomes esperados no frontend
        const motoboysFormatted = motoboys.map(m => ({
            id: m.id,
            username: m.nome,
            cpf: m.cpf,
            seq: m.seq,
            status: m.status,
            placa: m.placa,
            previsaoRetorno: m.previsaoRetorno,
            veiculo: m.veiculo,
            cnh: m.cnh,
            email: m.email,
            data: m.CriadoEm
        }));
        return NextResponse.json({motoboys: motoboysFormatted}, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar motoboys:", error);
        return NextResponse.json({ message: "Erro ao buscar motoboys" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    const { username, cpf, placa, tipo, cnh, email } = await request.json();

    if (!username || !cpf || !placa || !tipo || !cnh || !email) {
        return NextResponse.json({ message: "Preencha todos os campos" }, { status: 400 });
    }

    // Validação de se existe CPF já cadastrado
    const cpfExists = await prisma.motoboy.findUnique({ where: { cpf } });
    if (cpfExists) {
        return NextResponse.json({ message: "CPF já cadastrado" }, { status: 400 });
    }

    // Validação de se existe CNH já cadastrada
    const cnhExists = await prisma.motoboy.findUnique({ where: { cnh } });
    if (cnhExists) {
        return NextResponse.json({ message: "CNH já cadastrada" }, { status: 400 });
    }

    try {
       const novoMotoboy = await prisma.motoboy.create({
            data: {
                nome: username,
                cpf,
                placa,
                veiculo: tipo,
                cnh,
                email
            },
        });

        const motoboyMapeado = {
            id: novoMotoboy.id,
            username: novoMotoboy.nome,
            cpf: novoMotoboy.cpf,
            placa: novoMotoboy.placa,
            tipo: novoMotoboy.veiculo,
            cnh: novoMotoboy.cnh,
            email: novoMotoboy.email,
            data: novoMotoboy.CriadoEm
        };
        return NextResponse.json({
            motoboy: motoboyMapeado,
            message: "Motoboy cadastrado com sucesso!"
        }, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: "Erro ao cadastrar Motoboy" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {

        const { cpf } = await request.json();
        if (!cpf) {
            return NextResponse.json({ message: "CPF não informado" }, { status: 400 });
        }

        // Deleta o motoboy pelo CPF
        await prisma.motoboy.delete({
            where: { cpf }
        });

        return NextResponse.json({ message: "Motoboy excluído com sucesso!" }, { status: 200 });
    } catch (error) {
        // Se não encontrar, Prisma lança erro
        return NextResponse.json({ message: "Erro ao excluir Motoboy" }, { status: 500 });
    }
}
