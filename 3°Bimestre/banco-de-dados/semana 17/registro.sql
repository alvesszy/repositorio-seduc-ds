PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
    cliente_id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    cidade TEXT NOT NULL
);

CREATE TABLE compras (
    compra_id INTEGER PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    valor_total REAL NOT NULL,
    data_compra TEXT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

INSERT INTO clientes (cliente_id, nome, email, cidade) VALUES
(1, 'Ana Silva', 'ana@email.com', 'São Paulo'),
(2, 'Bruno Lima', 'bruno@email.com', 'Osasco'),
(3, 'Carla Souza', 'carla@email.com', 'São Paulo'),
(4, 'Diego Rocha', 'diego@email.com', 'Barueri');

INSERT INTO compras (compra_id, cliente_id, valor_total, data_compra) VALUES
(1, 1, 150.00, '2026-08-05'),
(2, 1, 300.00, '2026-08-08'),
(3, 2, 90.00, '2026-08-10'),
(4, 3, 500.00, '2026-08-12'),
(5, 3, 200.00, '2026-08-15');


-- 1. SELECT
SELECT nome, email
FROM clientes;


-- 2. WHERE
SELECT nome, cidade
FROM clientes
WHERE cidade = 'São Paulo';


-- 3. ORDER BY
SELECT nome, cidade
FROM clientes
ORDER BY nome ASC;


-- 4. SUM, AVG e COUNT
SELECT SUM(valor_total) AS total_vendas
FROM compras;

SELECT AVG(valor_total) AS media_compras
FROM compras;

SELECT COUNT(*) AS quantidade_compras
FROM compras;


-- 5. INNER JOIN
SELECT c.nome, c.email, p.valor_total
FROM clientes c
INNER JOIN compras p
    ON c.cliente_id = p.cliente_id
ORDER BY p.compra_id;


-- 6. LEFT JOIN
SELECT c.nome, c.email, p.valor_total
FROM clientes c
LEFT JOIN compras p
    ON c.cliente_id = p.cliente_id
ORDER BY c.cliente_id, p.compra_id;


-- 7. Subconsulta em SELECT
SELECT c.nome,
       (
           SELECT SUM(p.valor_total)
           FROM compras p
           WHERE p.cliente_id = c.cliente_id
       ) AS total_compras
FROM clientes c;


-- 8. Subconsulta em WHERE
SELECT nome, email
FROM clientes
WHERE cliente_id IN (
    SELECT cliente_id
    FROM compras
    WHERE valor_total > (
        SELECT AVG(valor_total)
        FROM compras
    )
);


-- 9. Subconsulta em FROM
SELECT sub.nome, sub.total_compras
FROM (
    SELECT c.nome,
           SUM(p.valor_total) AS total_compras
    FROM clientes c
    JOIN compras p
        ON c.cliente_id = p.cliente_id
    GROUP BY c.cliente_id, c.nome
) AS sub
WHERE sub.total_compras > (
    SELECT AVG(valor_total)
    FROM compras
);