import { FilmeController } from "../controller/filme.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = Router();
const filmeController = new FilmeController();

//Aqui acontece o "Meio do caminho" (middle). Antes de acessar algum rota /filme, o middleware é chamado
// .use intercepta todas as requisições. 
router.use(authMiddleware);

router.post('/',filmeController.create);
router.delete('/:id',filmeController.delete);
router.get('/',filmeController.findAll);
router.get('/:id',filmeController.findById);
router.put('/:id',filmeController.update);

export {router as filmeRoutes};