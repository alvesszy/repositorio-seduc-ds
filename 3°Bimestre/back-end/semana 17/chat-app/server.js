const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8081 });

console.log("Servidor WebSocket rodando na porta 8081");

wss.on("connection", (ws) => {
    console.log("Novo usuário conectado");

    ws.on("message", (message) => {
        console.log("Mensagem recebida:", message.toString());

        // Envia a mensagem para todos os usuários conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("Usuário desconectado");
    });
});
