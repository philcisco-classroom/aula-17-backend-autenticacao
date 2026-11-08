import { prisma } from "../prisma/client.js";

export class FilmeService{

    async create(dados: {titulo: string; nota: number; imagem: string;}, userId: number)
    {
        await prisma.filme.create({
            data:{
                ...dados,
                userId,
            },
        });
    }

    async delete(id: number, userId: number)
    {
        await prisma.filme.delete({
            where: {
                id,
                userId
            },
        });
    }

    async findAll(userId: number)
    {
        return await prisma.filme.findMany({
            where: {
                userId
            }
        });
    }

    async findById(id: number, userId: number)
    {
        return await prisma.filme.findUnique({
            where: {
                id,
                userId
            }
        });
    }

    async update(id:number, userId: number, dados: {titulo: string; nota: number; imagem: string; })
    {

        await prisma.filme.update({
            where:{
                id,
                userId,
            },
            data: dados,
        });
    }

}