// Classe que representa um pedido de venda de carro.

export class PedidoVenda {

    /* Atributos */
    /* Identificador do pedido */
    private idPedido: number;
    /* Identificador do carro */
    private idCarro: number;
    /* Marca do carro */
    private marca: string;
    /* Identificador do cliente */
    private idCliente: number;
    /* Modelo do carro */
    private modelo: string;
    /* Data do pedido */
    private dataPedido: Date;
    /* Ano do carro */
    private ano: number;
    /* Valor do pedido */
    private valorPedido: number;
    /* Cor do carro */
    private cor: string;

    /**
     * Construtor da classe PedidoVenda
     * 
     * @param idPedido Identificador do pedido
     * @param idCarro Identificador do carro
     * @param marca Marca do carro
     * @param idCliente Identificador do cliente
     * @param modelo Modelo do carro
     * @param dataPedido Data do pedido
     * @param ano Ano do carro
     * @param valorPedido Valor do pedido
     * @param cor Cor do carro
     */
    constructor(
        idPedido: number,
        idCarro: number,
        marca: string,
        idCliente: number,
        modelo: string,
        dataPedido: Date,
        ano: number,
        valorPedido: number,
        cor: string
    ) {
        this.idPedido = idPedido;
        this.idCarro = idCarro;
        this.marca = marca;
        this.idCliente = idCliente;
        this.modelo = modelo;
        this.dataPedido = dataPedido;
        this.ano = ano;
        this.valorPedido = valorPedido;
        this.cor = cor;
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

    public getMarca(): string {
        return this.marca;
    }

    public setMarca(marca: string): void {
        this.marca = marca;
    }

    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }

    public getDataPedido(): Date {
        return this.dataPedido;
    }

    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    public getAno(): number {
        return this.ano;
    }

    public setAno(ano: number): void {
        this.ano = ano;
    }

    public getValorPedido(): number {
        return this.valorPedido;
    }

    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }

    public getCor(): string {
        return this.cor;
    }

    public setCor(cor: string): void {
        this.cor = cor;
    }

    /* Métodos adicionais */
    /**
     * Listagem de carros.
     * 
     * @returns Array de Carros
     */
    public static listarCarros(): Array<PedidoVenda> {
        // Implementação da listagem de carros
        return [];
    }

    /**
     * Listagem de pedidos.
     * 
     * @returns Array de pedidos
     */
    public static listarPedidos(): Array<PedidoVenda> {
        // Implementação da listagem de pedidos
        return [];
    }

    /**
     * Cadastro de um carro.
     * 
     * @param carro Carro a ser cadastrado.
     * @returns boolean indicando sucesso ou falha.
     */
    public static cadastroCarro(carro: PedidoVenda): boolean {
        // Implementação do cadastro
        return true;
    }

    /**
     * Cadastro de um pedido.
     * 
     * @param idCliente Identificador do cliente.
     * @param idCarro Identificador do carro.
     * @param dataPedido Data do pedido.
     * @param valorPedido Valor do pedido.
     * @returns boolean indicando sucesso ou falha.
     */
    public static cadastroPedido(idCliente: number, idCarro: number, dataPedido: Date, valorPedido: number): boolean {
        // Implementação do cadastro do pedido
        return true;
    }
}
