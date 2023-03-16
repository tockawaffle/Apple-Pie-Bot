# Apple Pie Bot. 🥧

Hello! It's me, тоска (yet again). This is my first "take it serious" project that is open-source.

Apple Pie is a Discord bot with many functions, such as Moderation, RolePlay Commands (There's only a few of them, but everything counts, right?), Cryptocurrencies, League of Legends Commands, and many other commands for you to use and manage your server or have some fun with your members!

## Features  - 🤖

- Capable of retrieving Cryptocurrencies/Tokens prices.
- Capable of giving you information about someone's League Stats.
- Capable of helping you to manage your guild.
- DM Commands!
- Slash Commands Only!
- Custom Language for each user (Supported now: English, Português do Brasil)
- Private Database (MongoDB)
- Server with plenty of RAM so that she can eat as many she wants. Heh.
- Many Others!
(For now, most of them are unavaiable, didn't had enough time to rewrite most of them in Typescript.)

  
## Changes - 🚀

From [v13](https://github.com/The-Crow-pleb/Apple-Pie-Bot/tree/Apple-Pie-v13) This bot saw some optimazations, such as the change of it's handler (Was using my own, now this bot is using [WOKCommands](https://github.com/AlexzanderFlores/WOKCommands-v2) as a handler, I changed some things myself on the package, nothing big though). There isn't much added to it yet, this is an work in progress.

But still, the bot might not be finished yet, but expect more changes soon! 

Found any bugs/errors or better ways to help in the optimization? Feel free to open a pull request, or an issue with details of the bug/error or code you changed!

  
## Acknowledgements - 👨‍🎓

 - This bot uses [Discord.js v13](https://github.com/discordjs/guide), [WOKCommands](https://github.com/AlexzanderFlores/WOKCommands-v2) and [cliprxyz](https://github.com/luisgbr1el/cliprxyz) • Excluding DiscordJS, the following packages were modified and can be found in the "modules" folder, with their LICENSE and full code: WOKCommands and cliprxyz
 - The creator of the bot is called [тоска](https://github.com/The-Crow-pleb)
 - The maintainer of the bot is called [Tockawa](https://github.com/Tockawa/) (Yes, their differ.)
 - The creator of the bot's main PFPs is called [Dixon](https://twitter.com/riickdixon)

  
## License / Terms of Use and Privacy - ⚖🚔

[MIT License](https://github.com/The-Crow-pleb/Apple-Pie-Bot/blob/Apple-Pie-v13/LICENSE)

[Riot License](https://github.com/The-Crow-pleb/Apple-Pie-Bot/blob/Apple-Pie-v13/RIOT-NOTE.md)

[Terms of Use and Privacy](https://www.tockanest.com/terms-of-use-and-privacy) //Offline

## Open Source Code - Licenses and Notifications

[cliprxyz](https://github.com/Tockawa/Apple-Pie-Bot/tree/Apple-TS/modules/cliprxyz) - [Github page / License](https://github.com/luisgbr1el/cliprxyz/blob/main/LICENSE)

[WOKCommands](https://github.com/Tockawa/Apple-Pie-Bot/tree/Apple-TS/modules/wokcommands) - [Author](https://github.com/AlexzanderFlores/WOKCommands-v2) • Coudn't find it's License.

[AesUtil](https://github.com/Tockawa/Apple-Pie-Bot/blob/Apple-TS/src/configs/functions/vault.ts) - [Author](https://gist.github.com/AndiDittrich/4629e7db04819244e843) • [Typescript Modification](https://gist.github.com/btxtiger/e8eaee70d6e46729d127f1e384e755d6)

## Deployment - 👨‍💻

To deploy this project, you can simply fork it or clone it and set the Enviroment Variables inside a dotenv file.

- Requirements
- - NodeJS v16
- - Git
- - An editor, such as VSC or others
- - Basic knowledge of JavaScript and Typescript (This is optional, but always good to have)

Required on the dotenv file:
(None of the fields bellow have a default setting, you *WILL* need them for this bot to work.)

```
    DISCORD_TOKEN: Your Bot's Token
    TEST_SERVERS: The test server ID
    OWNER_ID: The ids of the developers
    MONGO_URI: The URI of your database
    
    AES_PREFIX: If you wish to use this bot encryption functionality, you'll need to write something here. Can be anything, such as: enc::

    STEAM_TOKEN: Your SteamAPI token  (TODO)
    RIOT_TOKEN: Your RiotAPI token (TODO)
```

### Known Bugs - 🖥️

--
  
## Roadmap - 🛣


- [ ] Finish the commands that are missing from v12/v13.

- [ ] Create a per-server economy. (Yes, every server with it's own economy.)

- [ ] Create a global economy using some kind of "point" to get more features and etc.

- [ ] Get more attention from other communities.

- [ ] Create a dashboard.

- [ ] Other things such as making more pies, I guess?

  
## Authors - 🍦

- [тоска](https://github.com/The-Crow-pleb)

- [Tockawa](https://github.com/Tockawa)

- [Dixon](https://twitter.com/riickdixon)

  
 ## Final words - 📖
 
 So, this bot has been abandoned by тоска, she didn't had enough time, nor the patience to continue working on this project, and with that said, me, Tockawa (no, not the same person, we both just love the word "тоска".) am the maintainer of this bot, as well as the host and if I dare to say so, owner (pls don't kill me if you read this) of Apple.
  
>_And once you are awake, you shall remain awake **eternally.**_
>― _Thus Spoke Zarathustra, Friedrich Wilhelm Nietzsche_

>_Don’t walk in front of me… I may not follow. Don’t walk behind me… I may not lead. Walk beside me… just be my friend_
>―_Albert Camus_
