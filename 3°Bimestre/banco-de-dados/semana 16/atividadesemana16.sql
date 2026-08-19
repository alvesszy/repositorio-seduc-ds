PRAGMA foreign_keys = ON;

DROP VIEW IF EXISTS relatorio_vendas;
DROP TABLE IF EXISTS relatorio_vendas_materializada;
DROP TABLE IF EXISTS itens_pedido;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
    id_cliente INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE produtos (
    id_produto INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    preco NUMERIC NOT NULL CHECK (preco >= 0)
);

CREATE TABLE pedidos (
    id_pedido INTEGER PRIMARY KEY,
    data_pedido TEXT NOT NULL,
    id_cliente INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pendente',
    FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE itens_pedido (
    id_item INTEGER PRIMARY KEY,
    id_pedido INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_produto)
        REFERENCES produtos(id_produto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO clientes (id_cliente, nome, email) VALUES
(1, 'Ana Souza', 'ana@fasttech.com'),
(2, 'Bruno Lima', 'bruno@fasttech.com'),
(3, 'Carla Mendes', 'carla@fasttech.com');

INSERT INTO produtos (id_produto, nome, categoria, preco) VALUES
(1, 'Notebook', 'Informática', 3500.00),
(2, 'Mouse', 'Informática', 120.00),
(3, 'Cadeira Gamer', 'Móveis', 950.00),
(4, 'Monitor 24', 'Informática', 900.00);

INSERT INTO pedidos (id_pedido, data_pedido, id_cliente, status) VALUES
(1, '2026-08-10', 1, 'Pago'),
(2, '2026-08-10', 2, 'Pendente'),
(3, '2026-08-11', 3, 'Pago');

INSERT INTO itens_pedido (id_item, id_pedido, id_produto, quantidade) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 2, 4, 1),
(4, 3, 3, 1);

SELECT * FROM clientes;
SELECT * FROM produtos;
SELECT * FROM pedidos;
SELECT * FROM itens_pedido;

SELECT
    pedidos.id_pedido,
    clientes.nome AS cliente,
    produtos.nome AS produto,
    itens_pedido.quantidade
FROM pedidos
JOIN clientes
    ON pedidos.id_cliente = clientes.id_cliente
JOIN itens_pedido
    ON pedidos.id_pedido = itens_pedido.id_pedido
JOIN produtos
    ON itens_pedido.id_produto = produtos.id_produto
ORDER BY pedidos.id_pedido, itens_pedido.id_item;

CREATE INDEX idx_produtos_categoria
ON produtos(categoria);

CREATE INDEX idx_produtos_categoria_preco
ON produtos(categoria, preco);

PRAGMA index_list('produtos');

EXPLAIN QUERY PLAN
SELECT *
FROM produtos
WHERE categoria = 'Informática'
  AND preco > 1000;

CREATE VIEW relatorio_vendas AS
SELECT
    p.id_pedido,
    c.nome AS cliente,
    pr.nome AS produto,
    pr.categoria,
    i.quantidade,
    pr.preco,
    (i.quantidade * pr.preco) AS total_item,
    p.status
FROM pedidos p
JOIN clientes c
    ON p.id_cliente = c.id_cliente
JOIN itens_pedido i
    ON p.id_pedido = i.id_pedido
JOIN produtos pr
    ON i.id_produto = pr.id_produto;

SELECT * FROM relatorio_vendas;