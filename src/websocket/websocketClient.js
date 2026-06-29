const WebSocket = require('ws');

function connectWebSocket({ url, onOpen, onMessage, onError, onClose }) {
    const ws = new WebSocket(url);

    ws.on('open', () => {
        if (onOpen) {
            onOpen(ws);
        }
    });

    ws.on('message', (message) => {
        if (onMessage) {
            onMessage(message);
        }
    });

    ws.on('error', (error) => {
        if (onError) {
            onError(error);
        }
    });

    ws.on('close', () => {
        if (onClose) {
            onClose();
        }
    });

    return ws;
}

module.exports = {
    connectWebSocket
};
