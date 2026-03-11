export const name = 'ping';
export async function run(sock, message, args) {
    await sock.sendMessage(message.key.remoteJid, { text: 'Pong! 🏓' });
}
