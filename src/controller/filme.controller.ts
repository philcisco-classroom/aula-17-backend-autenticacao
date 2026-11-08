import { Request, Response } from "express";
import { FilmeService } from "../services/filme.service.js";
import { AuthPayload } from "../tipos/auth-payload.js";

const filmeService = new FilmeService();

export class FilmeController{

    async create(req: Request,res: Response)
    {

        const user =
            res.locals.user as AuthPayload;

        const dados = req.body;
        await filmeService.create(dados,user.id);
        res.status(200).send();
    }

    async delete(req: Request, res: Response)
    {
           const user =
            res.locals.user as AuthPayload;

        const id = Number(req.params.id);
        await filmeService.delete(id,user.id);
        res.status(200).send();
    }

    async update(req:Request, res:Response)
    {

        const user =
            res.locals.user as AuthPayload;

        const id = Number(req.params.id);
        const dados = req.body;
        await filmeService.update(id,user.id,dados);
        res.status(200).send();
    }

    async findAll(req:Request, res:Response)
    {
        const user =
            res.locals.user as AuthPayload;

        const filmes = await filmeService.findAll(user.id);
        res.status(200).json(filmes);
    }

    async findById(req:Request, res:Response)
    {
        
        const user =
            res.locals.user as AuthPayload;
        const id = Number(req.params.id);
        const filme = await filmeService.findById(id,user.id);
        res.status(200).json(filme);
    }


    

}