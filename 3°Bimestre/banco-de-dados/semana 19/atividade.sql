-- PARTE 1: Criar as tabelas

CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    endereco VARCHAR(255)
);

CREATE TABLE Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    data_pedido DATE,
    status VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

CREATE TABLE Itens_Pedido (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_produto INT,
    quantidade INT,
    preco DECIMAL(10,2),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
);


-- PARTE 2: Transação

START TRANSACTION;

-- Inserir cliente
INSERT INTO Clientes (nome, email, endereco)
VALUES ('Arthur Saraiva', 'arthur@email.com', 'Rua das Flores, 789');

-- Inserir pedido
INSERT INTO Pedidos (id_cliente, data_pedido, status)
VALUES (LAST_INSERT_ID(), '2024-11-10', 'Em Processamento');

-- Inserir item do pedido
INSERT INTO Itens_Pedido (id_pedido, id_produto, quantidade, preco)
VALUES (LAST_INSERT_ID(), 101, 2, 299.90);

-- Confirmar a transação
COMMIT;


-- Mostrar os resultados

SELECT * FROM Clientes;

SELECT * FROM Pedidos;

SELECT * FROM Itens_Pedido;