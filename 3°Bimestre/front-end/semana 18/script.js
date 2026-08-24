function calcularTotal(valores) {
    return valores.reduce((total, valor) => total + valor, 0);
}

console.log(calcularTotal([100, 50]));

console.assert(
    calcularTotal([100, 50]) === 150,
    "Teste 1 falhou"
);

console.assert(
    calcularTotal([20, 30, 10]) === 60,
    "Teste 2 falhou"
);

console.log("Testes concluídos");
