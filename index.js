const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const token = process.env.TOKEN:

fs.readdir("./src/commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./src/commands/${file}`);
    let eventName = file.split(".")[0];
    console.log(`${file} has loaded`);
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("ready", () => {
  let total = client.users.filter(user => user.bot).size;
  let total1 = client.users.filter(user => !user.bot).size;
  let games = [`over the dashboard`, `over bots`, `over ${total} bots`, `over ${total1} members`];
  
  setInterval(function() {
        let list = games[Math.floor(Math.random()*games.length)];
          client.user.setActivity(list, { type: 'WATCHING' });
  }, 10000);
});

client.on("message", message => {
  if (message.author.bot) return;

  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : 'a!';
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(message.content.indexOf(prefix) !== 0) return;

  try {
    let commandFile = require(`./src/commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.log(err.stack);
  }

  // Ulgy stuff
  if(message.content === prefix + 'role blue') {
    if(message.channel.id != '477619433594945540') return;
      let role = message.guild.roles.find("name", "Blue");
      if(!role){
        message.guild.createRole({
          name: "Blue",
          color: "#4268f4"
        })
      }
      message.channel.send(`Sucessfully gave you the Blue role`)
      message.member.addRole(role);
  }

  if(message.content === prefix + 'role red') {
    if(message.channel.id != '477619433594945540') return;
      let role = message.guild.roles.find("name", "Red");
      if(!role){
        message.guild.createRole({
          name: "Red",
          color: "#f44141"
        })
      }
      message.channel.send(`Sucessfully gave you the Red role`)
      message.member.addRole(role);
  }
});
client.login(token);