import { Request, Response } from 'express';
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO {
    idCliente: number,
    idCarro: number,
    dataPedido: Date,
    valorPedido: number
}

// Definindo a classe PedidoVendaController que herda da classe PedidoVenda
class PedidoVendaController extends PedidoVenda {

    // Método estático 'todos' que responde a uma requisição para listar todos os pedidos de venda
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método 'listarPedidos' da classe 'PedidoVenda' para obter a lista de pedidos
            const listaDePedidos = await PedidoVenda.listarPedidos();

            // Retorna a lista de pedidos em formato JSON com o status HTTP 200 (OK)
            res.status(200).json(listaDePedidos);
            // Em caso de erro, exibe uma mensagem no console e retorna um erro 400 (Bad Request) com uma mensagem
        } catch (error) {
            console.log(`Erro ao acessar o método herdado: ${error}`);
            res.status(400).json("Erro ao recuperar as informações");
        }   
    }

 /**
    */
 static async novo(req: Request, res: Response): Promise<Response> {
    try {
        // recuperando informações do corpo da requisição e colocando em um objeto da interface PedidoVendaDTO
        const pedidoRecebido: PedidoVendaDTO = req.body;

        // instanciando um objeto do tipo PedidoVenda com as informações recebidas
        const novoPedido = new PedidoVenda(pedidoRecebido.idCliente, 
                                    pedidoRecebido.idCarro,
                                    pedidoRecebido.dataPedido,
                                    pedidoRecebido.valorPedido);

        // Chama a função de cadastro passando o objeto como parâmetro
        const repostaClasse = await PedidoVenda.cadastroPedido(novoPedido);

        // verifica a resposta da função
        if(repostaClasse) {
            // retornar uma mensagem de sucesso
            return res.status(200).json({ mensagem: "Pedido de Venda cadastrado com sucesso!" });
        } else {
            // retorno uma mensagem de erro
            return res.status(400).json({ mensagem: "Erro ao cadastrar o Pedido de Venda. Entre em contato com o administrador do sistema."})
        }
        
    } catch (error) {
        // lança uma mensagem de erro no console
        console.log(`Erro ao cadastrar um Pedido de Venda. ${error}`);

        // retorna uma mensagem de erro há quem chamou a mensagem
        return res.status(400).json({ mensagem: "Não foi possível cadastrar o Pedido de Venda. Entre em contato com o administrador do sistema." });
    }
}
static async remover(req: Request, res: Response) {
    try {

        const idPedidoVenda = parseInt(req.params.idPedidoVenda as string);

        const respostaModelo = await PedidoVenda.removerPedido(idPedidoVenda);

        if(respostaModelo) { 
            return res.status(200).json({ mensagem: "Pedido removido com sucesso!"});
            } else {
                return res.status(400).json({ mensagem: "Erro ao remover o carro. Entre em contato com o administrador do sistema."});
            }

    } catch (error) {
        console.log(`Erro ao remover o pedido. ${error}`);
        return res.status(400).json({ mensagem: "Não foi possível remover o pedido. Entre em contato com o administrador do sistema."});
    }
}
// Método para atualizar um pedido
static async atualizar(req: Request, res: Response): Promise<Response> {
    try {
        // Extrai o objeto pedido do corpo da requisição
        const pedidoRecebido: PedidoVendaDTO = req.body;

        // Extrai o ID do pedido a partir dos parâmetros da URL
        const idPedidoRecebido = parseInt(req.params.idPedido as string);

        // Cria uma instância do objeto Pedido com os dados recebidos
        const pedidoAtualizado = new PedidoVenda(
            pedidoRecebido.idCliente,
            pedidoRecebido.idCarro,
            pedidoRecebido.dataPedido,
            pedidoRecebido.valorPedido
        );

        // Define o ID do pedido na instância
        pedidoAtualizado.setIdPedido(idPedidoRecebido);

        // Chama o método de atualização do modelo
        const respostaModelo = await PedidoVenda.atualizarPedido(pedidoAtualizado);

        // Retorna sucesso caso o pedido tenha sido atualizado
        if (respostaModelo) {
            return res.status(200).json({ mensagem: "pedido atualizado com sucesso!" });
        } else {
            // Caso a atualização não tenha sido realizada, retorna erro
            return res.status(400).json({ mensagem: "Erro ao atualizar o pedido. Entre em contato com o administrador do sistema." });
        }
    } catch (error) {
        // Tratamento de erros, retornando uma mensagem apropriada
        console.log(`Erro ao atualizar o pedido. ${error}`);
        return res.status(400).json({ mensagem: "Não foi possível atualizar o pedido. Entre em contato com o administrador do sistema." });
    }
}
}

// Exporta a classe 'PedidoVendaController' para que possa ser utilizada em outras partes do código
export default PedidoVendaController;
