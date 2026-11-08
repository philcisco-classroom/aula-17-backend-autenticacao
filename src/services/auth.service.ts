import { prisma } from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export class AuthService{

    async create(email: string, senha: string)
    {
        const existeUser = await prisma.user.findUnique({
            where: {email}
        });

        if(existeUser){
            throw new Error(
                "Erro ao criar usuário"
            );
        }
        //lembrar que bcrypt é assincrono.
        //tive esse bug, custei a encontrar o erro.
        const senhaHashed = await bcrypt.hash(senha,10);

        const dados = {
            email,
            senha: senhaHashed
        }

        const user = await prisma.user.create({
            data: dados,
        });
        
        return {
            id: user.id,
            email: user.email
        }
    }

    async login(email: string, senha: string)
    {
        
        const user =  await prisma.user.findUnique({
            where: {email}
        });
        
        if(!user)
        {
            throw new Error(
                "Usuário ou senha inválido"
            );
        }

        const senhaMatch = await bcrypt.compare(senha,user.senha);

        if(!senhaMatch)
        {
            throw new Error(
                "Usuário ou senha inválido"
            );
        }

        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        );
        //devolve o token pq o login foi sucesso. Senha conferiu
        return {
            token,
        };
    }

}