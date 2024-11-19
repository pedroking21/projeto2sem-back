import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;
/**
 * Classe que representa um cliente.
 */
export class Cliente {

    /* Atributos */
    /* Identificador do cliente */
    private idCliente: number = 0;
    /* nome do cliente */
    private nome: string;
    /* cpf do cliente */
    private cpf: string;
    /* telefone do cliente */
    private telefone: string;

    /**
     * Construtor da classe Cliente
     * 
     * @param nome Nome do cliente
     * @param cpf CPF do cliente
     * @param telefone Telefone do cliente
     */
    constructor(
        nome: string,
        cpf: string,
        telefone: string
    ) {
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
     * Retorna o cpf do cliente.
     *
     * @returns {string} O cpf do cliente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o cpf do cliente.
     *
     * @param cpf - O nome do cpf do cliente.
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
         * @param telefone - O telefone do cliente.
         */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

//MÉTODO PARA ACESSAR O BANCO DE DADOS
    //CRUD create - READ - update - delete
    static async listarClientes(): Promise<Array<Cliente> | null> {
        //Criando lista vazia para armazenar os clientes
        let listaDeClientes: Array<Cliente> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectCliente = `SELECT * FROM cliente;`;

            // Executa a query no banco de dados
            const respostaBD = await database.query(querySelectCliente);

            respostaBD.rows.forEach((cliente) => {
                let novoCliente = new Cliente(
                    cliente.nome,
                    cliente.cpf,
                    cliente.telefone
                );
                //Adicionando o ID ao objeto
                novoCliente.setIdCliente(cliente.id_cliente);

                //Adicionando o cliente na lista
                listaDeClientes.push(novoCliente);
            });

            //Retornando a lista de clientes para quem chamou a função
            return listaDeClientes;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }
    /**
     * Realiza o cadastro de um Cliente no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Cliente` e insere seus dados (nome, cpf e telefone)
     * na tabela `Cliente` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Cliente} cliente - Objeto contendo os dados do cliente que será cadastrado. O objeto `Cliente`
     *                        deve conter os métodos `getNome()`, `getCpf()` e `getTelefone()`
     *                        que retornam os respectivos valores do cliente.
     * @returns {Promise<boolean>} - Retorna `true` se o cliente foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            // query para fazer insert de um cliente no banco de dados
            const queryInsertCliente = `INSERT INTO cliente (nome, cpf, telefone)
                                        VALUES
                                        ('${cliente.getNome()}', 
                                        '${cliente.getCpf()}', 
                                        ${cliente.getTelefone()} )
                                        RETURNING id_cliente;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCliente);
            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso! ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;
            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
    // Função para remover um cliente do banco de dados
static async removerCliente(idCliente: number): Promise<boolean> {
    try {
        // Monta a query de exclusão com base no ID do cliente
        // IMPORTANTE: Use query parameters para evitar SQL Injection
        const queryDeleteCliente = `DELETE FROM cliente WHERE id_cliente = $1`;

        // Executa a query no banco de dados passando o ID do cliente como parâmetro
        const respostaBD = await database.query(queryDeleteCliente, [idCliente]);

        // Verifica se alguma linha foi afetada (ou seja, se o cliente foi realmente removido)
        if (respostaBD.rowCount != 0) {
            console.log(`Cliente removido com sucesso. ID removido: ${idCliente}`);
            return true; // Retorna sucesso caso o cliente tenha sido removido
        }

        // Caso nenhuma linha tenha sido afetada, retorna falso
        return false;

    } catch (error) {
        // Tratamento de erros
        console.log('Erro ao remover o cliente. Verifique os logs para mais detalhes.');
        console.log(error); // Log detalhado do erro
        return false; // Retorna falso em caso de falha
    }
}
// Função para atualizar um cliente no banco de dados
static async atualizarCliente(cliente: Cliente): Promise<boolean> {
    try {
        // Monta a query de atualização com os dados do carro
        // É importante sanitizar esses valores para evitar SQL Injection
        const queryUpdateCliente = `
            UPDATE cliente SET 
                nome = '${cliente.getNome()}',
                cpf = '${cliente.getCpf()}',
                telefone = '${cliente.getTelefone()}'
            WHERE id_cliente = ${cliente.getIdCliente()};
        `;

        // Executa a query no banco de dados
        const respostaBD = await database.query(queryUpdateCliente);

        // Verifica se alguma linha foi afetada (ou seja, se o cliente foi atualizado com sucesso)
        if (respostaBD.rowCount != 0) {
            console.log(`Cliente atualizado com sucesso! ID: ${cliente.getIdCliente()}`);
            return true; // Retorna sucesso
        }

        // Caso nenhuma linha tenha sido afetada, retorna falso
        return false;

    } catch (error) {
        // Tratamento de erros
        console.log('Erro ao atualizar o cliente. Verifique os logs para mais detalhes.');
        console.log(error);
        return false; // Retorna falso em caso de falha
    }
}
}