import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um pedido de venda.
 */
export class PedidoVenda {

    /* Atributos */
    private idPedido: number = 0; // Identificador do pedido
    private idCarro: number; // Identificador do carro
    private idCliente: number; // Identificador do cliente
    private dataPedido: Date; // Data do pedido
    private valorPedido: number; // Valor do pedido

    /**
     * Construtor da classe PedidoVenda
     * 
     * @param idCarro Identificador do carro
     * @param idCliente Identificador do cliente
     * @param dataPedido Data do pedido
     * @param valorPedido Valor do pedido
     */
    constructor(
        idCarro: number,
        idCliente: number,
        dataPedido: Date,
        valorPedido: number
    ) {
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /* Métodos get e set */

    public getIdPedido(): number {
        return this.idPedido;
    }

    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    public getIdCarro(): number {
        return this.idCarro;
    }

    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    public getDataPedido(): Date {
        return this.dataPedido;
    }

    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    public getValorPedido(): number {
        return this.valorPedido;
    }

    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }

    /* Métodos para acessar o banco de dados */

    /**
     * Lista todos os pedidos no banco de dados.
     */
    static async listarPedidos(): Promise<Array<PedidoVenda> | null> {
        let listaDePedidos: Array<PedidoVenda> = [];

        try {
            const query = `SELECT * FROM pedido_venda;`;
            const respostaBD = await database.query(query);

            respostaBD.rows.forEach((pedido) => {
                const novoPedido = new PedidoVenda(
                    pedido.id_carro,
                    pedido.id_cliente,
                    pedido.data_pedido,
                    pedido.valor_pedido
                );
                novoPedido.setIdPedido(pedido.id_pedido);
                listaDePedidos.push(novoPedido);
            });

            return listaDePedidos;
        } catch (error) {
            console.error(`Erro ao listar pedidos: ${error}`);
            return null;
        }
    }

    /**
     * Cadastra um novo pedido no banco de dados.
     */
    static async cadastrarPedido(pedidoVenda: PedidoVenda): Promise<boolean> {
        try {
            const query = `
                INSERT INTO pedido_venda (id_carro, id_cliente, data_pedido, valor_pedido)
                VALUES ($1, $2, $3, $4)
                RETURNING id_pedido;
            `;

            const respostaBD = await database.query(query, [
                pedidoVenda.getIdCarro(),
                pedidoVenda.getIdCliente(),
                pedidoVenda.getDataPedido(),
                pedidoVenda.getValorPedido()
            ]);

            if (respostaBD.rowCount !== 0) {
                console.log(`Pedido cadastrado com sucesso! ID: ${respostaBD.rows[0].id_pedido}`);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Erro ao cadastrar o pedido:', error);
            return false;
        }
    }

    /**
     * Remove um pedido do banco de dados.
     */
    static async removerPedido(idPedido: number): Promise<boolean> {
        try {
            const query = `DELETE FROM pedido_venda WHERE id_pedido = $1;`;
            const respostaBD = await database.query(query, [idPedido]);

            if (respostaBD.rowCount !== 0) {
                console.log(`Pedido removido com sucesso. ID: ${idPedido}`);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Erro ao remover o pedido:', error);
            return false;
        }
    }

    /**
     * Atualiza um pedido no banco de dados.
     */
    static async atualizarPedido(pedido: PedidoVenda): Promise<boolean> {
        try {
            const query = `
                UPDATE pedido_venda SET
                    id_carro = $1,
                    id_cliente = $2,
                    data_pedido = $3,
                    valor_pedido = $4
                WHERE id_pedido = $5;
            `;

            const respostaBD = await database.query(query, [
                pedido.getIdCarro(),
                pedido.getIdCliente(),
                pedido.getDataPedido(),
                pedido.getValorPedido(),
                pedido.getIdPedido()
            ]);

            if (respostaBD.rowCount !== 0) {
                console.log(`Pedido atualizado com sucesso! ID: ${pedido.getIdPedido()}`);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Erro ao atualizar o pedido:', error);
            return false;
        }
    }
}