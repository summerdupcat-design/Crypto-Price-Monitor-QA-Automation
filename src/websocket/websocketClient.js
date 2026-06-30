const WebSocket = require('ws');

function getWebSocketOptions() {
    const options = { handshakeTimeout: 15000 };
    const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

    if (proxy) {
        try {
            const { HttpsProxyAgent } = require('https-proxy-agent');
            options.agent = new HttpsProxyAgent(proxy);
        } catch {
            console.warn('⚠️  已设置 HTTPS_PROXY，但未安装 https-proxy-agent，代理未生效');
        }
    }

    return options;
}

function connectWebSocket({ url, onOpen, onMessage, onError, onClose }) {
    const ws = new WebSocket(url, getWebSocketOptions());

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
