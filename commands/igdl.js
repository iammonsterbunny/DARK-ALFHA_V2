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
const {
    bold
} = require('@mengkodingan/ckptw');
const {
    instagram
} = require('../lib/scraper.js');
const {
    sendStatus
} = require('../lib/simple.js');

module.exports = {
    name: 'igdl',
    aliases: ['instagram', 'ig'],
    category: 'downloader',
    code: async (ctx) => {
        sendStatus(ctx, 'processing');

        const input = ctx._args.join(' ');

        if (!input) return ctx.reply(`${bold('[ ! ]')} Masukkan URL!`).then(() => sendStatus(ctx, 'noRequest'));

        try {
            const igdl = await instagram(input);

            return ctx.reply({
                video: {
                    url: igdl.data[0].url
                },
                caption: `• URL: ${input}`,
                gifPlayback: false
            }).then(() => sendStatus(ctx, 'success'));
        } catch (error) {
            console.error("Error:", error);
            await ctx.reply(`${bold('[ ! ]')} There is an error: ${error.message}`).then(() => sendStatus(ctx, 'failure'));
        }
    }
};