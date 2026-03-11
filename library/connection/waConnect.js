import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason, jidDecode } from '@whiskeysockets/baileys';
import Pino from 'pino';
import fs from 'fs-extra';
import readline from 'readline';

const logger = Pino({ level: 'info' });

export async function connectToWhatsApp() {
    console.log('================================');
    console.log('ALMEER-V4 BOT STARTING');
    console.log('================================\n');

    const { state, saveCreds } = await useMultiFileAuthState('./session');

    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        logger,
        printQRInTerminal: false,
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log('WhatsApp disconnected:', reason);
            console.log('Reconnecting...');
            connectToWhatsApp();
        } else if (connection === 'open') {
            console.log('Bot Connected!');
            if (!fs.existsSync('./session')) {
                promptPairingCode(sock);
            }
        }
    });

    return sock;
}

function promptPairingCode(sock) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter your WhatsApp number with country code:\n', (number) => {
        console.log('\nGenerating pairing code...\n');
        const pairingCode = generatePairingCode();
        console.log(`PAIRING CODE: ${pairingCode}`);
        console.log('Scan or enter this code in WhatsApp Linked Devices.\n');
        rl.close();
    });
}

function generatePairingCode() {
    return `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
                                                             }
