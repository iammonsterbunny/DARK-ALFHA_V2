# DarkAlfha WhatsApp Bot
<div align="center">
  <img src="https://i.ibb.co/frfFSTL/1691320469926.jpg" width="150" height="150" border="0" alt="PFP">

</div>
DarkAlfha WhatsApp Bot is a Node.js-based WhatsApp bot that provides various functionalities including information retrieval, media downloading, and more. This project utilizes the `@mengkodingan/ckptw` library to facilitate WhatsApp bot interactions.

## Features

- Owner Information Retrieval
- Facebook Video Downloader
- Instagram Media Downloader
- Command Menu
- Ping and Speed Check
- Sticker Creation
- Bot Uptime Information

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/iammonsterbunny/DARK-ALFHA_V2/tree/Open-Source.git
    cd DARK-ALFHA_V2-Open-Source
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure the bot:**
    Modify the `config.js` file with your details:
    ```js
    // Main
    global.organization = 'yourbot name';
    global.ownername = 'your name';
    global.owner = 'your number ex: 491234567890';

    // Sticker
    global.packname = 'Take care of yourself.';
    global.author = '@iammonsterbunny';
    ```

4. **Start the bot:**
    ```bash
    npm start
    ```

## Usage

Once the bot is running, you can interact with it through WhatsApp by sending the following commands:

### Info Commands
- **Ping**: Checks the bot's responsiveness.
    ```text
    /ping
    ```
- **Speed**: Measures the bot's response speed.
    ```text
    /speed
    ```
- **Owner Information**: Retrieves the owner's contact information.
    ```text
    /owner
    ```

### Downloader Commands
- **Facebook Video Downloader**: Downloads videos from Facebook.
    ```text
    /fbdl [Facebook URL]
    ```
- **Instagram Media Downloader**: Downloads media from Instagram.
    ```text
    /igdl [Instagram URL]
    ```

### Main Commands
- **Menu**: Displays the list of available commands.
    ```text
    /menu
    ```

### Converter Commands
- **Sticker**: Creates a sticker from an image or video.
    ```text
    /sticker
    ```

### Additional Commands
- **Uptime**: Displays how long the bot has been running.
    ```text
    /uptime
    ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any feature requests or bug reports.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [@mengkodingan/ckptw](https://github.com/mengkodingan/ckptw)
- [wa-sticker-formatter](https://github.com/adiwajshing/Baileys)
- [api-dylux](https://github.com/dylux/api-dylux)
- [bochilteam/scraper](https://github.com/BochilTeam/scraper)
---

Created by E.S. Team. Take care of yourself.
