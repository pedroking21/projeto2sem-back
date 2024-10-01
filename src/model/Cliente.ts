// Classe que representa um cliente.

export class Cliente {

    /* Atributos */
    /* Identificador do cliente */
    private idCliente: number;
    /* Nome do cliente */
    private nome: string;
    /* CPF do cliente */
    private cpf: string;
    /* Telefone do cliente */
    private telefone: string;

    /**
     * Construtor da classe Cliente
     * 
     * @param idCliente Identificador do cliente
     * @param nome Nome do cliente
     * @param cpf CPF do cliente
     * @param telefone Telefone do cliente
     */
    constructor(
        idCliente: number,
        nome: string,
        cpf: string,
        telefone: string
    ) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do cliente
     * @returns o identificador do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um valor ao identificador do cliente
     * @param idCliente novo identificador do cliente
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna o nome do cliente.
     *
     * @returns {string} O nome do cliente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do cliente.
     * 
     * @param nome - O nome do cliente a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o CPF do cliente.
     *
     * @returns {string} O CPF do cliente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o CPF do cliente.
     *
     * @param cpf - O CPF do cliente a ser definido.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o telefone do cliente.
     *
     * @returns {string} O telefone do cliente.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o telefone do cliente.
     * 
     * @param telefone - O novo telefone do cliente.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    /**
     * Listagem de clientes.
     * 
     * @returns Array de clientes.
     */
    public static listarClientes(): Array<Cliente> {
        // Implementação da listagem de clientes
        return [];
    }

    /**
     * Cadastro de um cliente.
     * 
     * @param cliente Cliente a ser cadastrado.
     * @returns boolean indicando sucesso ou falha.
     */
    public static cadastrarCliente(cliente: Cliente): boolean {
        // Implementação do cadastro
        return true;
    }
}
    