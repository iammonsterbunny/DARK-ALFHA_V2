/*
Discord Sopport https://dsc.gg/EchoScriptors
MIT License

Copyright (c) 2023 MonsterBunny

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
require('./config.js');
const {
    bold,
    Client,
    CommandHandler
} = require('@mengkodingan/ckptw');
const {
    Events,
    MessageType
} = require('@mengkodingan/ckptw/lib/Constant');
const {
    inspect
} = require('util');
const path = require('path');
const similarity = require('similarity');
const {
    exec
} = require('child_process');
const {
    sendStatus
} = require('./lib/simple.js');

console.log('Connecting...');


global.startTime = null;

const bot = new Client({
    name: 'Isla (アイラ Aira)',
    prefix: /([^\w\s])/i,
    printQRInTerminal: true,
    readIncommingMsg: true
});
bot.ev.once(Events.ClientReady, (m) => {
    console.log(`Ready at ${m.user.id}`);
    global.startTime = Date.now();
});
process.on('uncaughtException', (err) => console.error(err));
const cmd = new CommandHandler(bot, path.resolve(__dirname, 'commands'));
cmd.load();

bot.ev.on(Events.MessagesUpsert, async (m, ctx) => {
    try {
        if (!m.content || m.key.fromMe) return;
        if (ctx._msg.content && ctx._config.cmd instanceof Map) {
            const commandList = Array.from(ctx._config.cmd.keys());

            const isCommandIncluded = commandList.some(command => ctx._msg.content.includes(command));

            if (isCommandIncluded) {
                ctx.simulateTyping(); 
            }
        }

        // Owner-only
        if (ctx._sender.jid.includes(global.owner)) {
            if (m.content.startsWith('> ') || m.content.startsWith('x ')) {
                sendStatus(ctx, 'processing');

                const code = m.content.slice(2);

                const result = await eval(m.content.startsWith('x ') ? `(async () => { ${code} })()` : code);
                await ctx.reply(inspect(result));
                return sendStatus(ctx, 'success');
            }
            if (m.content.startsWith('$ ')) {
                sendStatus(ctx, 'processing');

                const command = m.content.slice(2);

                const output = await new Promise((resolve, reject) => {
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            reject(new Error(`Error: ${error.message}`));
                        } else if (stderr) {
                            reject(new Error(stderr));
                        } else {
                            resolve(stdout);
                        }
                    });
                });

                await ctx.reply(output);
                return sendStatus(ctx, 'success');
            }
        }
    } catch (error) {
        console.error("Error:", error);
        await ctx.reply(`${bold('[ ! ]')} There is an error: ${error.message}`);
        sendStatus(ctx, 'failure');
    }
});

bot.launch().catch((error) => console.error('Error:', error));