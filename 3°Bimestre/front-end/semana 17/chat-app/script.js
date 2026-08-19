const socket = new WebSocket("ws://localhost:8081");
const statusEl = document.getElementById("status");
const messagesEl = document.getElementById("messages");
const nameEl = document.getElementById("name");
const messageEl = document.getElementById("message");
const sendButton = document.getElementById("sendButton");

socket.onopen = () => {
    statusEl.textContent = "Status: conectado";
};

socket.onmessage = (event) => {
    const item = document.createElement("p");
    item.textContent = event.data;
    messagesEl.appendChild(item);
};

socket.onerror = () => {
    statusEl.textContent = "Status: erro de conexão";
};

socket.onclose = () => {
    statusEl.textContent = "Status: desconectado";
};

function enviarMensagem() {
    const nome = nameEl.value.trim();
    const mensagem = messageEl.value.trim();

    if (!nome || !mensagem) {
        alert("Preencha seu nome e a mensagem.");
        return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
        alert("A conexão com o servidor ainda não está pronta.");
        return;
    }

    socket.send(`${nome}: ${mensagem}`);
    messageEl.value = "";
    messageEl.focus();
}

sendButton.addEventListener("click", enviarMensagem);
messageEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        enviarMensagem();
    }
});
