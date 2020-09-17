const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const welcomeChannelName = "입장";
const byeChannelName = "퇴장";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '사뇨비V2의 도움말운 .사뇨야 도움말. 이에요!'}, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "3층 주민들"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});


client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '사뇨야 핑') {
      message.channel.send(`<@${message.author.id}> ` + "님의 핑운 " + client.ping +' ms' + "에요!")
  } else if (message.content == '사뇨야 안뇽') {
      message.reply('어..어?안영!나눈 사뇨양!))우웁..오타')
  }

  if(message.content == '사뇨야 제작자') {
    let img = 'https://cdn.discordapp.com/attachments/731508995541565494/755638012376907867/image-2020211456.png';
    let embed = new Discord.RichEmbed()
      .setTitle('무잔의 설명')
      .setAuthor('무잔')
      .setThumbnail(img)
      .addBlankField()
      .addField('무잔의 나이는?', '2020년기준 15!')
      .addField('사는곳!', '비밀!', true)
      .addField('더 질문하고싶으면!', '무잔#4659로 갠디!', true)
      .addBlankField()
      .setTimestamp()
      .setFooter('무잔이 만듬', img)

    message.channel.send(embed)
  } else if(message.content == '사뇨야 도움말') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '사뇨야 도움말', desc: '사뇨가 도움말이 뭐뭐 있는지 알려줘용'},
      {name: '사뇨야 핑', desc: '사뇨가 핑을 알려줘요'},
      {name: '사뇨야 제작자', desc: '사뇨봇을 만든사람을 알려줘요'},
      {name: '!전체공지', desc: 'Dm으로 전체 공지 보내주어용!'},
      {name: '!전체공지2', desc: 'Dm으로 전체 embed 형식으로 공지 보내끼!'},
      {name: '사뇨야 청소', desc: '채팅을 1~100개 사이를 지워준대용!'},
      {name: '사뇨야 안뇽', desc: '사뇨가 인사해줘요!'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('대충 명령어가 이씀!', helpImg)
      .setColor('#186de6')
      .setFooter(`사뇨봇V2!`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content.startsWith('!전체공지2')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지2'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('사뇨가 말해주는 공지!')
        .setColor('#186de6')
        .setFooter(`샤뇨봇V2!`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('사뇨가 완벽하게 공지를 전송해떠요!');
    } else {
      return message.reply('채널에서 실행해주세용..');
    }
  } else if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('사뇨가 완벽하게 공지를 전송해떠요!');
    } else {
      return message.reply('채널에서 실행해주세용..');
    }
  } else if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } if(message.content.startsWith('사뇨야 청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('사뇨야 청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세여! 아! 혹시...띄어쓰기 안하신거 아니죠..?")
      return;
    } else if(!isNum) { // c @무잔 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + "사뇨가 " + parseInt(clearLine) + "개의 메시지를 삭제해떠요!. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "이 명령어눈 관리자만 쓸쑤 이떠요!.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}



client.login(token);