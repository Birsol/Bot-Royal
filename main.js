const Discord = require('discord.js');
const fs = require('fs');

var bot = new Discord.Client();
var prefix = ("!");
var randnum = 0;
var randbvn = 0;

function checkBots(guild) {
    let botCount = 0;
    guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount;
  }

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++;
    });
    return memberCount;
  }

  function checkOnlineMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(member.presence.status == "online" || member.presence.status == "idle" || member.presence.status == "dnd") memberCount++;
    });
    return memberCount;
  }

let xp = require("./xp.json");

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: 'aider les joueurs [!help] ', type: 0 } });
    console.log("Prêt pour la Victoire Royale !");
    bot.channels.get("548471315200475137").send("!deletemessages");
    bot.channels.get("548471466161864737").send("!deletemessages");
    setTimeout(function(){
        const Apex = bot.emojis.find("name", "ApexLegends");
        const Fortnite = bot.emojis.find("name", "Fortnite");
        const Pubg = bot.emojis.find("name", "PUBG");
        const Realm = bot.emojis.find("name", "RealmRoyale");
        const Ring = bot.emojis.find("name", "RingofElysium");
        bot.channels.get("548471315200475137").send("Pour avoir les rôles correspondants aux Battles Royales auxquels vous jouez, il suffit de cliquer sur les logos des jeux !").then(async function (message) {
            await message.react(Apex);
            await message.react(Fortnite);
            await message.react(Pubg);
            await message.react(Realm);
            await message.react(Ring);
        });
        bot.channels.get("548471466161864737").send("Bienvenue sur le serveur **Discord Royal** ! Avant de commencer à poster des messages et pour avoir accès au reste du serveur, veuillez lire et accepter les règles suivantes\n\nLe règlement définit les règles du serveur Discord, il est considéré comme lu et accepté par tout membre du serveur.\n\n**-**  Vous êtes dans un serveur Discord multijoueur. Il est donc obligatoire de respecter les autres joueurs, les modérateurs, les administrateurs et les règles.\n\n**-**  Ne pas insulter ou cela vous vaudra un bannissemment permanent.\n\n**-**  Ne pas faire de publicité, sinon vous serez expulsé puis banni si vous recommencez\n\n**-**  Ne pas spammer sinon ban définitif.\n\n**-**  Le Bot Royal (moi) supprime toute insulte ou mot raciste, antisémite, etc... Contourner le système de détection des messages en changeant l'orthographe des mots vous vaudra un ban définitif immédiat.\n\nSi vous avez des questions, libre à vous de contacter un Modérateur ou un Administrateur.").then(async function (message) {
            await message.react("✅");
        });
    }, 3000);
});

bot.login(process.env.TOKEN);

bot.on('guildMemberAdd', member => {
    rand();
    const channel = member.guild.channels.find('name', '🚩bienvenue');
    if(randbvn == 0) {
        channel.send(`**${member.user.username}** a rejoint le serveur ! Bienvenue à toi :smile: !`);
    }
    if(randbvn == 1) {
        channel.send(`C'est un... NON, un... Mais non ! C'est **${member.user.username}** !`);
    }
    if(randbvn == 2) {
        channel.send(`Nous t'attendions **${member.user.username}** :tada: !`);
    }
    if(randbvn == 3) {
        channel.send(`Le survivant **${member.user.username}** est arrivé !`);
    }
    if(randbvn == 4) {
        channel.send(`Faites place ! Voici **${member.user.username}** !`);
    }
    if(randbvn == 5) {
        channel.send(`Hey **${member.user.username}** ! Prêt pour le top 1 ? :wink:`);
    }
    member.sendMessage(`Bienvenue sur le serveur **Discord Royal**, ${member.user.username} !\n\n- Je t'invite à lire les règles du serveur dans le salon #📜règlement (pense à valider ta lecture en cochant la case en bas du règlement :D)\n\n- Je t'invite aussi à choisir le ou les jeux auquels tu joue dans le salon #📌rôles !\n\n- Si tu veux savoir les commandes que je peux faire, tapes !help dans le salon #🤖commandes.\n\n- Si tu as besoin d'aide pour quoi que ce soit et que je ne peut pas répondre à ta question, je t'invite a contacter mon créateur, @Birsol#1319 !\n\nBon jeu sur Discord Royal ! :wink:`)
    console.log("Une personne a rejoint le serveur !")
  });

bot.on('message', message => {

    if(message.content == prefix + "membercount") {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name} - Informations`, message.guild.iconURL)
            .setColor('#FFFFFF')
            .addField("Nombre de personnes", message.guild.memberCount)
            .addField('Humains', checkMembers(message.guild), true)
            .addField('Bots', checkBots(message.guild), true)
            .addField('Connectés', checkOnlineMembers(message.guild), true)
            .setFooter('Serveur créé le :')
            .setTimestamp(message.guild.createdAt);
        return message.channel.send(embed)
    }

    if(message.content == prefix + "deletemessages") {
        if (!message.member.roles.find("name", "Bot Royal")) {
            message.delete();
            return;
        }
        message.channel.fetchMessages()
            .then(function(list){
                message.channel.bulkDelete(list);
            }, function(err){message.channel.send("ERREUR")})
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;

    if(!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    let curxp = xp[message.author.id].xp;
    let curLvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp = curxp + xpAdd;

    if(nxtLvl <= curxp) {
        xp[message.author.id].level = curLvl + 1;
        let lvlup = new Discord.RichEmbed()
        .setTitle("Niveau suivant !")
        .setColor("#FFFFFF")
        .addField("Nouveau niveau", curLvl + 1);

        message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }

    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err);
    });

    if(message.content == prefix + "niveau") {
        if(message.channel.id === '548510389487271954') {
            if(!xp[message.author.id]) {
                xp[message.author.id] = {
                    xp: 0,
                    level: 1
                };
            }
        
            let curxp = xp[message.author.id].xp;
            let curLvl = xp[message.author.id].level;
            let nxtLvlXp = curLvl * 300;
            let difference = nxtLvlXp - curxp;
        
            let lvlEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setColor("#FFFFFF")
            .addField("Niveau", curLvl, true)
            .addField("XP", curxp, true)
            .setFooter(`${difference} XP avant le prochain niveau`, message.author.displayAvaterURL);
        
        
            message.channel.send(lvlEmbed);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    //Insultes
    if (message.content.toUpperCase().includes('PUTE')) {
        message.delete();
        message.author.send('Insulte "Pute" détectée, merci de ne pas dire des méchancetés pareilles !');
    }

    if (message.content.toUpperCase().includes('PUTIN')) {
        message.delete();
        message.author.send('Insulte "Putin" détectée, merci de ne pas dire des méchancetés pareilles !');
    }

    if (message.content.toUpperCase().includes('FDP')) {
        message.delete();
        message.author.send('Insulte "FDP" détectée, merci de ne pas dire des méchancetés pareilles !');
    }

    if (message.content.toUpperCase().includes('NIQUE')) {
        message.delete();
        message.author.send('Insulte "Nique" détectée, merci de ne pas dire des méchancetés pareilles !');
    }

    if (message.content.toUpperCase().includes('NTM')) {
        message.delete();
        message.author.send('Insulte "NTM" détectée, merci de ne pas dire des méchancetés pareilles !');
    }

    if (message.content.toUpperCase().includes('CHIER')) {
        message.delete();
        message.author.send('Insulte "Chier" détectée, merci de ne pas dire des méchancetés pareilles !');
    }

    if (message.content.toUpperCase().includes('TG')) {
        message.delete();
        message.author.send('Insulte "TG" détectée, merci de ne pas dire des méchancetés pareilles !');
    }

    if (message.content.toUpperCase().includes('SUCK')) {
        message.delete();
        message.author.send('Insulte "Suck" détectée, merci de ne pas dire des méchancetés pareilles !');
    }

    if (message.content.toUpperCase().includes('DICK')) {
        message.delete();
        message.author.send('Insulte "Dick" détectée, merci de ne pas dire des méchancetés pareilles !');
    }


    if (message.content.toUpperCase().includes('HTTPS://')) {
        if (message.member.roles.find("name", "Modérateur")) {
            return;
        }
        message.delete()
        message.author.send("S'il te plaît, ne fais pas de publicité !")
    }

    if (message.content === prefix + "coffres"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Voici l'emplacement des coffres de Fortnite Battle Royale ! https://ibb.co/d5fngz");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }
    if (message.content === prefix + "munitions"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Voici l'emplacement des boites de munitions de Fortnite Battle Royale ! https://ibb.co/eRyXgz");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }
    if (message.content === prefix + "distributeurs"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Voici l'emplacement des distributeurs de Fortnite Battle Royale ! https://ibb.co/c2EPTe");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }
    if (message.content === prefix + "caddies"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Voici l'emplacement des caddies de Fortnite Battle Royale ! https://ibb.co/fQwSgz");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "voiturettes"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Voici l'emplacement des voiturettes de golf de Fortnite Battle Royale ! https://ibb.co/ft4PTe");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "failles"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Voici l'emplacement des failles de Fortnite Battle Royale ! https://ibb.co/nJzr8e");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "pommes"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Voici l'emplacement des pommes de Fortnite Battle Royale ! https://ibb.co/coj2EK");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "champignons"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Voici l'emplacement des champignons de Fortnite Battle Royale ! https://ibb.co/gN701z");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats"){
        if(message.channel.id === '548510389487271954') {
            message.reply("merci de préciser un argument : !stats <FORTNITE/REALM ROYALE> <PC/XBOX/PS4/SWITCH> (si Fortnite: <BR/SLM>)");
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats FORTNITE PC BR"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le mode Battle Royale de Fortnite t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur le mode Battle Royale, clique sur ce lien :\n https://www.stormshield.one/pvp/stats/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats FORTNITE XBOX BR"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le mode Battle Royale de Fortnite t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur le mode Battle Royale, clique sur ce lien :\n https://www.stormshield.one/pvp/stats/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats FORTNITE PS4 BR"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le mode Battle Royale de Fortnite t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur le mode Battle Royale, clique sur ce lien :\n https://www.stormshield.one/pvp/stats/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats FORTNITE SWITCH BR"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le mode Battle Royale de Fortnite t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur le mode Battle Royale, clique sur ce lien :\n https://www.stormshield.one/pvp/stats/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats FORTNITE PC SLM"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le mode Sauver le Monde de Fortnite t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur le mode Sauver le Monde, clique sur ce lien :\n https://www.stormshield.one/pve/stats/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats FORTNITE XBOX SLM"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le mode Sauver le Monde de Fortnite t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur le mode Sauver le Monde, clique sur ce lien :\n https://www.stormshield.one/pve/stats/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats FORTNITE PS4 SLM"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le mode Sauver le Monde de Fortnite t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur le mode Sauver le Monde, clique sur ce lien :\n https://www.stormshield.one/pve/stats/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats FORTNITE SWITCH SLM"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le mode Sauver le Monde de Fortnite t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur le mode Sauver le Monde, clique sur ce lien :\n https://www.stormshield.one/pve/stats/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats REALM ROYALE PC"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le jeu Realm Royale t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur Realm Royale, clique sur ce lien :\n https://realmtracker.com/profile/pc/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats REALM ROYALE XBOX"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le jeu Realm Royale t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur Realm Royale, clique sur ce lien :\n https://realmtracker.com/profile/xbox/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "stats REALM ROYALE PS4"){
        if(message.channel.id === '548510389487271954') {
            message.reply("Tes statistiques sur le jeu Realm Royale t'on été envoyées en messages privés !");
            message.author.send(`:warning: **Vérifiez que votre pseudo Discord soit le même qu'en jeu !** :warning:\n \nPour voir tes statistiques sur Realm Royale, clique sur ce lien :\n https://realmtracker.com/profile/ps/${message.author.username}`);
        } else {
            message.delete();
            message.reply("Tu dois être dans le salon #🤖commandes pour pouvoir exécuter cette commande !");
            return;
        }
    }

    if (message.content === prefix + "help"){
        message.reply("La liste des commandes t'as été envoyée en messages privés !")
        var help_embed = new Discord.RichEmbed()
            .setColor('#FFFFFF')
            .addField("Mes commandes :", "   - !help : Affiche mes commandes disponibles\n - !stats <FORTNITE/REALM ROYALE> <PC/XBOX/PS4/SWITCH> (si Fortnite: <BR/SLM>) : Exécutez cette commande pour avoir vos statistiques sur les différents jeux proposés.\n- !membercount : Cette commande permet de voir les informations du serveur Discord.")
            .addField("Fortnite :", "   - !coffres : Affiche la carte des coffres de Fortnite Battle Royale !\n- !munitions : Affiche la carte des boîtes de munitions de Fortnite Battle Royale !\n- !distributeurs : Affiche la carte des distributeurs de Fortnite Battle Royale !\n- !caddies : Affiche la carte des caddies de Fortnite Battle Royale !\n- !voiturettes : Faites cette commande pour voir l'emplacement des voiturettes de Golf de Fortnite Battle Royale !\n- !failles : Affiche l'emplacement des failles de Fortnite Battle Royale !\n- !pommes : Affiche l'emplacement des pommes de Fortnite Battle Royale !\n- !champignons : Faites cette commande pour voir l'emplacement des champignons de Fortnite Battle Royale !")
            .addField("Interactions :", "   - Comment ça va Bot Royal ? : Posez-moi cette question et je vous répondrai une réponse en fonction de mon humeur.\n- Quelle est ma photo de profil ? : Posez moi cette question et je vous donnerai votre photo de profil.")
        message.author.sendEmbed(help_embed);
        console.log("Commande Help demandée");
    }

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (msg.startsWith(prefix + 'CLEAR')) {
        async function purge() {
            message.delete();

            if (!message.member.roles.find("name", "Modérateur")) {
                message.channel.send('Tu dois avoir le rôle \`Modérateur\` pour utiliser cette commande !');
                return;
            }

            if (isNaN(args[0])) {
                message.channel.send("Merci d'entrer le nombre de messages à supprimer. \n Usage: " + prefix + "clear <nb_de_messages>");
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' messages trouves, suppression...');

            message.channel.bulkDelete(fetched).then(() => {
                message.channel.send(fetched.size + " messages ont étés supprimés.").then(msg => msg.delete(5000));
            });

        }

        purge();

    }

    if (message.content === "Comment ça va Bot Royal ?"){
        random();

        if (randnum == 0){
            message.reply("Je vais très bien, merci.");
            console.log("humeurbien");
        }

        if (randnum == 1){
            message.reply("Bof, je suis pas de bonne humeur en ce moment.");
            console.log("humeurbof");
        }

    }

    if (message.content === 'Quelle est ma photo de profil ?') {
        message.reply(`ta photo de profil est : ${message.author.avatarURL}`);
    }

    if (message.content === "Par qui as-tu été créé ?"){
        message.reply("J'ai été créée par Birsol !")
    }

    if (message.content === "Que la lumière soit !"){
        message.reply("Et la lumière fut !")
    }

    if (message.content === "Quel est le sens de la vie ?"){
        message.reply("42, bien évidemment !")
    }

    if (message.content === "Je m'ennuie..."){
        message.reply("C'est problématique... Ah ! Je sais ! Joue à un Battle Royale :wink:")
    }

});

bot.on('messageReactionAdd', (reaction, user) => {
    const message = reaction.message;
    var member = message.guild.members.get(user.id);
    if (message.content === "Pour avoir les rôles correspondants aux Battles Royales auxquels vous jouez, il suffit de cliquer sur les logos des jeux !"){
        if(reaction.emoji.name === 'ApexLegends') {
            member.addRole("548462517295382528");
        };
        if(reaction.emoji.name === 'Fortnite') {
            member.addRole("548462522873806858");
        };
        if(reaction.emoji.name === 'PUBG') {
            member.addRole("548462511649718282");
        }
        if(reaction.emoji.name === 'RealmRoyale') {
            member.addRole("548462520843632661");
        };
        if(reaction.emoji.name === 'RingofElysium') {
            member.addRole("548462518389964816");
        };
    };

    if (message.content === "Bienvenue sur le serveur **Discord Royal** ! Avant de commencer à poster des messages et pour avoir accès au reste du serveur, veuillez lire et accepter les règles suivantes\n\nLe règlement définit les règles du serveur Discord, il est considéré comme lu et accepté par tout membre du serveur.\n\n**-**  Vous êtes dans un serveur Discord multijoueur. Il est donc obligatoire de respecter les autres joueurs, les modérateurs, les administrateurs et les règles.\n\n**-**  Ne pas insulter ou cela vous vaudra un bannissemment permanent.\n\n**-**  Ne pas faire de publicité, sinon vous serez expulsé puis banni si vous recommencez\n\n**-**  Ne pas spammer sinon ban définitif.\n\n**-**  Le Bot Royal (moi) supprime toute insulte ou mot raciste, antisémite, etc... Contourner le système de détection des messages en changeant l'orthographe des mots vous vaudra un ban définitif immédiat.\n\nSi vous avez des questions, libre à vous de contacter un Modérateur ou un Administrateur."){
        if(reaction.emoji.name === '✅') {
            member.addRole("548462213158010940");
        };
    };
});

bot.on('messageReactionRemove', (reaction, user) => {
    const message = reaction.message;
    var member = message.guild.members.get(user.id);
    //const Fortnite = bot.emojis.find("name", "Fortnite");
    if (message.content === "Pour avoir les rôles correspondants aux Battles Royales auxquels vous jouez, il suffit de cliquer sur les logos des jeux !"){
        if(reaction.emoji.name === 'ApexLegends') {
            member.removeRole("548462517295382528");
        };
        if(reaction.emoji.name === 'Fortnite') {
            member.removeRole("548462522873806858");
        };
        if(reaction.emoji.name === 'PUBG') {
            member.removeRole("548462511649718282");
        };
        if(reaction.emoji.name === 'RealmRoyale') {
            member.removeRole("548462520843632661");
        };
        if(reaction.emoji.name === 'RingofElysium') {
            member.removeRole("548462518389964816");
        };
    };
    if (message.content === "Bienvenue sur le serveur **Discord Royal** ! Avant de commencer à poster des messages et pour avoir accès au reste du serveur, veuillez lire et accepter les règles suivantes\n\nLe règlement définit les règles du serveur Discord, il est considéré comme lu et accepté par tout membre du serveur.\n\n**-**  Vous êtes dans un serveur Discord multijoueur. Il est donc obligatoire de respecter les autres joueurs, les modérateurs, les administrateurs et les règles.\n\n**-**  Ne pas insulter ou cela vous vaudra un bannissemment permanent.\n\n**-**  Ne pas faire de publicité, sinon vous serez expulsé puis banni si vous recommencez\n\n**-**  Ne pas spammer sinon ban définitif.\n\n**-**  Le Bot Royal (moi) supprime toute insulte ou mot raciste, antisémite, etc... Contourner le système de détection des messages en changeant l'orthographe des mots vous vaudra un ban définitif immédiat.\n\nSi vous avez des questions, libre à vous de contacter un Modérateur ou un Administrateur."){
        if(reaction.emoji.name === '✅') {
            member.removeRole("548462213158010940");
        };
    };
    });

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(1);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}

function rand(min, max) {
    min = Math.ceil(0);
    max = Math.floor(5);
    randbvn = Math.floor(Math.random() * (max - min +1) + min);
}