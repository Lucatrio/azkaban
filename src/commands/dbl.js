const Discord = require('discord.js');
const request = require('request');

exports.run = async (client, message, args) => {

    let user = message.mentions.members.first();
        if(!user.user.bot) return;

    request(`https://discordbots.org/api/bots/${user.id}`, function (error, response, body) {
        if (error) {
            console.log(error);
            message.channel.send(`Sorry, that page does not exist or there was a problem with the system`)
        }
            var info = JSON.parse(body);
            var botid = info.id;
            var username = info.username;
            var discrim = info.discriminator;
            var lib = info.lib;
            var prefix = info.prefix;
            var short = info.shortdesc;
            var upvote = info.points;
            let cert = info.certifiedBot;
            let url = `https://cdn.discordapp.com/avatars/${botid}/${info.avatar}.png?size=128`;
    let embed = new Discord.RichEmbed()
        .setColor("36393F")
        .setThumbnail(url)
        .addField(`Username`, username)
        .addField(`Discriminator`, discrim)
        .addField(`Identification`, botid)
        .addField(`Library`, lib)
        .addField(`Prefix`, prefix)
        .addField(`Short`, short)
        .addField(`Votes`, upvote)
        .addField(`Certified`, cert);
    message.channel.send(embed);
});
}
