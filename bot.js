const settings = require("./settings.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

client.login(settings.token);

client.on("ready", ready =>{
    console.log("Ready");
})

client.on("guildMemberAdd", memb =>{
    for(let i = 0; i < settings.names.length; i++){
        if(memb.user.username.toLowerCase().includes(settings.names[i].toLowerCase())){
            memb.kick().catch(err =>{
                if(err) console.log(err);
            })
        }
    }
})

client.on("message", msg =>{
    let args = msg.content.split(' ');
    if(msg.channel.type !== "text") return;
    if(args[0] === settings.prefix + "clearnames" && msg.member.hasPermission("ADMINISTRATOR")){
        //clearnames
        settings.names = [];
        fs.writeFile("settings.json", JSON.stringify(settings, ' ', 2), async function(err) {
            if(err) console.log(err);
            msg.reply("Done!")
        })
    }
    if(args[0] === settings.prefix + "addname" && msg.member.hasPermission("ADMINISTRATOR")){
        //addname name
        if(!args[1]) return;
        let name = '';
        for(let i = 1; i < args.length; i++){
            name += args[i];
            if(i !== args.length - 1) name += ' ';
        }
        settings.names.push(name);
        fs.writeFile("settings.json", JSON.stringify(settings, ' ', 2), async function(err){
            msg.reply("Done!")
            if(err) console.log(err);
            let members = (await msg.guild.members.fetch()).array();
            for(let i = 0; i < members.length; i++){
                if(!members[i].user.bot){
                    if(members[i].user.username.toLowerCase().includes(name.toLowerCase())){
                        members[i].kick().catch(err => {
                            if (err) console.log(err)
                        });
                    }
                }
            }
        })
    }
})