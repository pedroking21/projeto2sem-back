import { Request, Response } from 'express';
import { Cliente } from "../model/Cliente";

interface ClienteDTO {
    nome: string,
    cpf: string,
    telefone: string
}

// Definindo a classe ClienteController que herda da classe Cliente
class ClienteController extends Cliente {

    // Método estático 'todos' que responde a uma requisição para listar todos os clientes
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método 'listarClientes' da classe 'Cliente' para obter a lista de clientes
            const listaDeClientes = await Cliente.listarClientes();

            // Retorna a lista de clientes em formato JSON com o status 200 (OK)
            res.status(200).json(listaDeClientes);
        } catch (error) {
            // Em caso de erro, exibe uma mensagem no console e retorna um erro 400 (Bad Request) com uma mensagem
            console.log(`Erro ao acessar o método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações");
        }   
    }

 /**
    * Método controller para cadastrar um novo cliente.
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do cliente no formato `ClienteDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
 static async novo(req: Request, res: Response): Promise<Response> {
    try {
        // recuperando informações do corpo da requisição e colocando em um objeto da interface clienteDTO
        const clienteRecebido: ClienteDTO = req.body;

        // instanciando um objeto do tipo cliente com as informações recebidas
        const novoCliente = new Cliente(clienteRecebido.nome, 
                                    clienteRecebido.cpf,
                                    clienteRecebido.telefone);

        // Chama a função de cadastro passando o objeto como parâmetro
        const repostaClasse = await Cliente.cadastroCliente(novoCliente);

        // verifica a resposta da função
        if(repostaClasse) {
            // retornar uma mensagem de sucesso
            return res.status(200).json({ mensagem: "Cliente cadastrado com sucesso!" });
        } else {
            // retorno uma mensagem de erro
            return res.status(400).json({ mensagem: "Erro ao cadastrar o cliente. Entre em contato com o administrador do sistema."})
        }
        
    } catch (error) {
        // lança uma mensagem de erro no console
        console.log(`Erro ao cadastrar um cliente. ${error}`);

        // retorna uma mensagem de erro há quem chamou a mensagem
        return res.status(400).json({ mensagem: "Não foi possível cadastrar o cliente. Entre em contato com o administrador do sistema." });
    }
}
static async remover(req: Request, res: Response) {
    try {

        const idCliente = parseInt(req.params.idCliente as string);

        const respostaModelo = await Cliente.removerCliente(idCliente);

        if(respostaModelo) { 
            return res.status(200).json({ mensagem: "Cliente removido com sucesso!"});
            } else {
                return res.status(400).json({ mensagem: "Erro ao remover o cliente. Entre em contato com o administrador do sistema."});
            }

    } catch (error) {
        console.log(`Erro ao remover o cliente. ${error}`);
        return res.status(400).json({ mensagem: "Não foi possível remover o cliente. Entre em contato com o administrador do sistema."});
    }
}
// Método para atualizar um cliente
static async atualizar(req: Request, res: Response): Promise<Response> {
    try {
        // Extrai o objeto carro do corpo da requisição
        const clienteRecebido: ClienteDTO = req.body;

        // Extrai o ID do cliente a partir dos parâmetros da URL
        const idClienteRecebido = parseInt(req.params.idCliente as string);

        // Cria uma instância do objeto Cliente com os dados recebidos
        const clienteAtualizado = new Cliente(
            clienteRecebido.nome,
            clienteRecebido.cpf,
            clienteRecebido.telefone
        );

        // Define o ID do cliente na instância
        clienteAtualizado.setIdCliente(idClienteRecebido);

        // Chama o método de atualização do modelo
        const respostaModelo = await Cliente.atualizarCliente(clienteAtualizado);

        // Retorna sucesso caso o cliente tenha sido atualizado
        if (respostaModelo) {
            return res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
        } else {
            // Caso a atualização não tenha sido realizada, retorna erro
            return res.status(400).json({ mensagem: "Erro ao atualizar o cliente. Entre em contato com o administrador do sistema." });
        }
    } catch (error) {
        // Tratamento de erros, retornando uma mensagem apropriada
        console.log(`Erro ao atualizar o pedido. ${error}`);
        return res.status(400).json({ mensagem: "Não foi possível atualizar o cliente. Entre em contato com o administrador do sistema." });
    }
}

}

// Exporta a classe 'ClienteController' para que possa ser utilizada em outras partes do código
export default ClienteController;