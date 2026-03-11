export const name = 'alive';
export async function run(sock, message, args) {
    await sock.sendMessage(message.key.remoteJid, { text: 'ALMEER-V4 is alive! ✅' });
}
