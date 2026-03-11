import { connectToWhatsApp } from './library/connection/waConnect.js';
import { handleMessage } from './message.js';
import fs from 'fs-extra';

async function startBot() {
    console.log('Loading plugins...');
    const sock = await connectToWhatsApp();

    sock.ev.on('messages.upsert', async (m) => {
        if (!m.messages) return;
        const msg = m.messages[0];
        await handleMessage(sock, msg);
    });
}

startBot();
