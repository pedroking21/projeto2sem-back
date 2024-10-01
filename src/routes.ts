import { Request, Response, Router } from "express";

// Cria um roteador
const router = Router();

//Criando uma rota principal para aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá Mundo!" });
});

// exportando as rotas
export { router };