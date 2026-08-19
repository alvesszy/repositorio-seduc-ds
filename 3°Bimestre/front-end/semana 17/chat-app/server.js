const WebSocket = require("ws");

const servidor = new WebSocket.Server({
    port: 8081
});

servidor.on("connection", (cliente) => {
    console.log("Novo cliente conectado");

    cliente.on("message", (mensagem) => {
        const texto = mensagem.toString();

        servidor.clients.forEach((outroCliente) => {
            if (outroCliente.readyState === WebSocket.OPEN) {
                outroCliente.send(texto);
            }
        });
    });

    cliente.on("close", () => {
        console.log("Cliente desconectado");
    });
});

console.log("Servidor WebSocket executando na porta 8081");
