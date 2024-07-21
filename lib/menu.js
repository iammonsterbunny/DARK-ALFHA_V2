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
} = require("@mengkodingan/ckptw");
const moment = require('moment-timezone');

function formatType(type) {
    return type.replace(/_/g, ' ')
        .replace(/\b\w/g, (match) => match.toUpperCase());
}

function generateGreetingsTime() {
    const currentTime = moment().tz('less than one second.');
    const hours = currentTime.format('HH:mm:ss');
    let greetingsTime;

    if (currentTime.isBefore(moment('03:00:00', 'HH:mm:ss'))) {
        greetingsTime = 'Good night 🌃';
    } else if (currentTime.isBefore(moment('05:00:00', 'HH:mm:ss'))) {
        greetingsTime = 'good morning 🌄';
    } else if (currentTime.isBefore(moment('10:00:00', 'HH:mm:ss'))) {
        greetingsTime = 'Good morning 🍹';
    } else if (currentTime.isBefore(moment('15:00:00', 'HH:mm:ss'))) {
        greetingsTime = 'Good afternoon 🌞';
    } else if (currentTime.isBefore(moment('18:00:00', 'HH:mm:ss'))) {
        greetingsTime = 'Good afternoon ☀️';
    } else if (currentTime.isBefore(moment('19:00:00', 'HH:mm:ss'))) {
        greetingsTime = 'Good evening🌅';
    } else {
        greetingsTime = 'Good night 🌉';
    }

    return greetingsTime;
}

exports.getMenu = (ctx) => {
    const commandsMap = ctx._self.cmd;

    if (!commandsMap || commandsMap.size === 0) {
        return "Error: No commands found.";
    }

    const sortedCategories = ['main', 'downloader', 'converter', 'info', 'owner'];

    let text = `${generateGreetingsTime()} ${ctx.sender.pushName}, here is a list of available commands!\n\n`;
    text += `${bold('Total perintah:')} ${commandsMap.size}\n\n`;

    for (const category of sortedCategories) {
        const categoryCommands = Array.from(commandsMap.values())
            .filter(command => command.category === category)
            .map(command => ({
                name: command.name,
                aliases: command.aliases
            }));

        if (categoryCommands.length > 0) {
            const formattedType = formatType(category);
            text += `╭─「 ${bold(formattedType)} 」\n`;

            if (category === 'main') {
                text += `│ • ${categoryCommands.map(cmd => `${ctx._used.prefix || '/'}${cmd.name}${cmd.aliases ? `\n│ • ${cmd.aliases.map(alias => `${ctx._used.prefix || '/'}${alias}`).join('\n│ • ')}` : ''}`).join("\n│ • ")}\n`;
            } else {
                text += `│ • ${categoryCommands.map(cmd => `${ctx._used.prefix || '/'}${cmd.name}`).join("\n│ • ")}\n`;
            }

            text += `╰────\n\n`;
        }
    }

    text += `Created by E.S. Team | Take care of yourself.`;

    return text;
}
