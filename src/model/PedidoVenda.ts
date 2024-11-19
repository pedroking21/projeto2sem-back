import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um pedido de venda.
 */
export class PedidoVenda {

    /* Atributos */
    /* Identificador do pedido */
    private idPedido: number = 0;
    /* Identificador do carro */
    private idCarro: number;
    /* modelo do carro */
    private idCliente: number;
    /* ano de fabrição do carro */
    private dataPedido: Date;
    /* cor do carro */
    private valorPedido: number;

    /**
     * Construtor da classe Carro
     * 
     * @param dataPedido 
     * @param valorPedido Cor do carro
     */
    constructor(
        idCarro: number,
        idCliente: number,
        dataPedido: Date,
        valorPedido: number,
    ) {
        this.idCarro = idCarro;
        this.idCliente = idCliente;   
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do pedido
     * @returns o identificador do pedido
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Atribui um valor ao identificador do pedido
     * @param idPedido novo identificado do pedido
     */
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    /**
     * Retorna o identificador do carro.
     *
     * @returns {number} O identificador do carro do carro.
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Define a identificador do carro.
     * 
     * @param idCarro - O identificador do carro a ser definido.
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Retorna o identificador do cliente.
     *
     * @returns {number} O identificador do cliente.
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Define o identificador do cliente.
     * 
     * @param idCliente - O identificador do cliente a ser definido.
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna a data do pedido.
     *
     * @returns {Date} A data do pedido.
     */
    public getDataPedido(): Date {
        return this.dataPedido;
    }

    /**
     * Define a data do pedido.
     * 
     * @param dataPedido - A data do pedido a ser definida.
     */
    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    /**
     * Retorna o valor do pedido.
     *
     * @returns {number} O valor do pedido.
     */
    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
     * Define o valor do pedido.
     * 
     * @param valorPedido - O valor do pedido a ser definido.
     */
    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
}

//MÉTODO PARA ACESSAR O BANCO DE DADOS
    //CRUD create - READ - update - delete
    static async listarPedidos(): Promise<Array<PedidoVenda> | null> {
        //Criando lista vazia para armazenar os pedidos
        let listaDePedidos: Array<PedidoVenda> = [];

        try {
            // Query para conslta no banco de dados
            const querySelectCliente = `SELECT * FROM pedido_venda;`;

            // Executa a query no banco de dados
            const respostaBD = await database.query(querySelectCliente);

            respostaBD.rows.forEach((pedido) => {
                let novoPedido = new PedidoVenda(
                    pedido.id_carro,
                    pedido.id_cliente,
                    pedido.data_pedido,
                    pedido.valor_pedido
                );
                //Adicionando o ID ao objeto
                novoPedido.setIdPedido(pedido.id_pedido);

                //Adicionando o pedido na lista
                listaDePedidos.push(novoPedido);
            });

            //Retornando a lista de pedidos para quem chamou a função
            return listaDePedidos;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }
/**
     * Método para criar um novo pedido no banco de dados
     */
static async cadastroPedido(pedidoVenda: PedidoVenda): Promise<boolean> {
    try {
        // query para fazer insert de um Pedido de Venda no banco de dados
        const queryInsertPedidoVenda = `INSERT INTO pedido_venda (id_carro, id_cliente, data_pedido, valor_pedido)
                                    VALUES
                                    ('${pedidoVenda.getIdCarro()}', 
                                    '${pedidoVenda.getIdCliente()}', 
                                    '${pedidoVenda.getDataPedido()}',
                                     ${pedidoVenda.getValorPedido()} )
                                    RETURNING id_pedido;`;

        // executa a query no banco e armazena a resposta
        const respostaBD = await database.query(queryInsertPedidoVenda);
        // verifica se a quantidade de linhas modificadas é diferente de 0
        if (respostaBD.rowCount != 0) {
            console.log(`Pedido cadastrado com sucesso! ID do pedido: ${respostaBD.rows[0].id_pedido}`);
            // true significa que o cadastro foi feito
            return true;
        }
        // false significa que o cadastro NÃO foi feito.
        return false;
        // tratando o erro
    } catch (error) {
        // imprime outra mensagem junto com o erro
        console.log('Erro ao cadastrar o pedido. Verifique os logs para mais detalhes.');
        // imprime o erro no console
        console.log(error);
        // retorno um valor falso
        return false;
    }
}
static async removerPedido(idPedidoVenda: number): Promise<boolean> {
    try{
        const queryDeletePedidoVenda = `DELETE FROM pedido WHERE id_pedidoVenda = ${idPedidoVenda}`;

        const respostaBD = await database.query(queryDeletePedidoVenda);

        if(respostaBD.rowCount != 0) {
            console.log(`Pedido removido com sucesso. ID removido: ${idPedidoVenda}`);

            return true;
        }

        return false;


    } catch (error) {
        console.log('Erro ao remover o pedido. Verifique os logs para mais detalhes.');
        console.log(error);
        return false;
    }
}
}