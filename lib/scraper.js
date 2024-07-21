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
const axios = require('axios');
const cheerio = require('cheerio');

exports.instagram = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encodeUrl = encodeURIComponent(url);
            const html = await axios.get('https://igram.vip/id-ID/search?url=' + encodeUrl);
            const $ = cheerio.load(html.data);
            const footerElement = $('.layui-card-footer a');
            const bodyElement = $('.layui-card-body img')
            const footerArray = footerElement.toArray().map((e) => $(e).attr('href'));
            const filterFooterArray = footerArray.filter(url => url.includes('https://downloader.twdown.online'));
            const bodyArray = bodyElement.toArray().map((e) => $(e).attr('src'));
            const newArray = []
            for (let i = 0; i < filterFooterArray.length; i++) {
                const imgUrl = bodyArray[i];
                const urlOri = filterFooterArray[i];
                const idUrl = urlOri.replace(/.*?ref=#url=/, '');
                const reqUrl = (await axios.get('https://downloader.twdown.online/load_url?url=' + idUrl)).data;
                newArray.push({
                    url: reqUrl,
                    thumbnail: imgUrl
                });
            }
            resolve({
                creator: 'E.S. Team',
                status: true,
                data: newArray
            })
        } catch (e) {
            console.log(e)
            reject({
                creator: 'E.S. Team',
                status: false
            })
        }
    })
}