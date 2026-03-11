export const name = 'menu';
export async function run(sock, message, args) {
    const menu = `
ALMEER-V4 BOT

• Download
  .play .song .ytmp3 .ytmp4 .tiktok .tiktokmp3 .instagram .facebook
• Search
  .yts .google .pinterest .wallpaper
• AI
  .ai .gpt .imagine
• Group
  .kick .add .promote .demote .tagall .hidetag .groupopen .groupclose
• Owner
  .shutdown .restart .eval .block .unblock
• Fun
  .joke .meme .quote .fact
`;
    await sock.sendMessage(message.key.remoteJid, { text: menu });
}
