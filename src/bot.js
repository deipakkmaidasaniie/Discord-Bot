let dotenv=require('dotenv').config;
const {Client}=require('discord.js');
const client=new Client({
    partials:['MESSAGE','REACTION']
});
const prefix="$";
client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in`);
})

client.on('message',async(message)=>{
    console.log(`${message.content}`);
    console.log(`${message.attachments}`);
    console.log(`${message.author.tag}: ${message.content}`);
    if(message.content==="hello" && !message.author.bot)
    {
        message.reply("hello");
        message.channel.send("Namaskar");
    }
    if(message.content.startsWith(prefix)){
        const [CMD_NAME,...args]=message.content.trim().substring(prefix.length).split(/\s+/); //take the string after the length specified in substring() and split it with the character specified in split()
        console.log(CMD_NAME);
        console.log(args);
    
    if(CMD_NAME==='kick')
    {
        if(!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply(`you don't have permissions :(`);
    
        if(args.length===0)
        return message.reply("please provide by id");
        let member=message.guild.members.cache.get(args[0]);
        if(member)
        {
            member.kick()
            .then((member)=>message.channel.send(`${member} was kicked`))
            .catch((err)=>message.channel.send(`I don't have permissions to kick ${member} :(  `));
        }
        else{
            message.channel.send("That member was not found");
        }
    }
    else if(CMD_NAME==='ban')
    {
        if(!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply(`you don't have permissions to ban members :(`);
    
        if(args.length===0)
        return message.reply("please provide by id");
        try{
            let user=await message.guild.members.ban(args[0]);
            if(user)
            {
                console.log("user:",user);
                message.reply(`${user} was banned successfully`);
            }
            else{
                message.channel.send("That member was not found");
            }
        }
        catch(err){
            message.channel.send("That member coudln't be banned due to some internal error");
        }
        
    }
}
    

})

client.on('messageReactionAdd',(reaction,user)=>{
    console.log("entered");
    const {name}=reaction.emoji;
    const member=reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id==='858080732193751070')
    {
        switch(name){
            case '🍎':
                member.roles.add('858079501534363648');
                break;
        }
    }
})
client.login("ODU3NzA4ODYzNzAwMzM2NjQx.YNThoA.v4YjhQvDU5wfm3qvtrIz4Yn-vlQ");
