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
require('../config.js');
const {
    MessageType
} = require('@mengkodingan/ckptw/lib/Constant');
const {
    Sticker,
    StickerTypes
} = require('wa-sticker-formatter');
const {
    sendStatus
} = require('../lib/simple.js');
const {
    bold
} = require('@mengkodingan/ckptw');

module.exports = {
    name: 'sticker',
    aliases: ['stiker', 's'],
    category: 'converter',
    code: async (ctx) => {
        sendStatus(ctx, 'processing');

        if (ctx.getMessageType() !== MessageType.imageMessage && ctx.getMessageType() !== MessageType.videoMessage) return ctx.reply(`${bold('[ ! ]')} Give a picture!`).then(() => sendStatus(ctx, 'noRequest'));

        try {
            const buffer = await ctx.getMediaMessage(ctx.msg, 'buffer');

            const stickerOptions = {
                pack: global.packname,
                author: global.author,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: ctx.id,
                quality: 50,
            };

            const sticker = new Sticker(buffer, stickerOptions);

            await ctx.reply(await sticker.toMessage()).then(() => sendStatus(ctx, 'success'));
        } catch (error) {
            console.error('Error', error);
            ctx.reply(`${bold('[ ! ]')} There is an error: ${error.message}`).then(() => sendStatus(ctx, 'failure'));
        }
    },
};
