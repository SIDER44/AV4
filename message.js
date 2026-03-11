import fs from 'fs-extra';
import path from 'path';

const plugins = {};

function loadPlugins() {
    const pluginFiles = fs.readdirSync('./plugins').filter(f => f.endsWith('.js'));
    for (const file of pluginFiles) {
        const plugin = await import(path.resolve(`./plugins/${file}`));
        plugins[plugin.name] = plugin.run;
    }
}

export async function handleMessage(sock, message) {
    if (!Object.keys(plugins).length) await loadPlugins();

    if (!message.message) return;
    const text = message.message.conversation || message.message.extendedTextMessage?.text;
    if (!text) return;

    const prefix = '.';
    if (!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (plugins[command]) {
        try {
            await plugins[command](sock, message, args);
        } catch (e) {
            console.error('Plugin error:', e);
        }
    }
}
