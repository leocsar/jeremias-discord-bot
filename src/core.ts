import { Client, Intents } from 'discord.js';
import { Message } from 'discord.js/typings';

require('dotenv').config({  
  path: '.env.testing'
});

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.on('ready', async () => {
  console.log('Jeremias iniciado e rodando');
});

client.on('raw', async (message) => {

});

client.on('messageCreate', async (message: Message) => {
  const splitedMessage = message.content.split(' ');
  const command = {
    commandText: splitedMessage.shift(),
    args: [ ...splitedMessage ]
  };

  switch (command.commandText) {
    case '/chamado':
      const args = {
        ticket: command.args.shift() || null,
        description: command.args.join(' ') || ''
      };

      if (args.ticket) {
        message.guild?.channels.create(`${args.ticket} ${args.description}`, { parent: '962015083226103898' })
        .then(() => {
          message.reply(`Canal referente ao chamado #${args.ticket} criado lá na aba de chamados!`);    
        })
        .catch(err => {
          message.reply('Não consegui criar o canal do chamado :c');
        });
      } else {
        message.reply('Informe o número do chamado! Por exemplo: /chamado 013658');
      };

      break;
  
    default:
      break;
  }

});

client.login(process.env.DISCORD_TOKEN);
