const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.login('Token here');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!depcontrol') {
    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder() 
        .setCustomId('bCreate')
        .setLabel("Create Account")
        .setStyle(ButtonStyle.Primary)
        .setEmoji({ name: "📝" }),
    );

    const embed = new EmbedBuilder()
    .setColor('Blue')
    .setDescription("**Account Control**\n\n*Create Account*\n\nPada channel ini, Anda dapat membuat akun UCP anda untuk bermain. Anda hanya Click tombol dibawah dan masukan username UCP untuk membuatnya")
    
    message.channel.send({ embeds: [embed], components: [button]});
  }
});

const { Events } = require('discord.js');

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isModalSubmit()) return;

	// Get the data entered by the user
	const sName = interaction.fields.getTextInputValue('nameUcpInput');
    console.log({sName});
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    const modal = new ModalBuilder()
    .setTitle('Create Account')
    .setCustomId('iName');
   
    const nameUcpInput = new TextInputBuilder()
    .setLabel("Enter Username")
    .setCustomId('nameUcpInput')
    .setStyle(TextInputStyle.Short)
    .setMinLength(3)
    .setMaxLength(12)
    .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(nameUcpInput);

	// Add inputs to the modal
	modal.addComponents(firstActionRow);

	// Show the modal to the user
	await interaction.showModal(modal);
  }
  if (interaction.customId === 'iName'){
        const sName = interaction.fields.getTextInputValue('nameUcpInput');
        interaction.reply({ content: `Account **${ sName }** has success register!`, ephemeral: true });
  }
});

