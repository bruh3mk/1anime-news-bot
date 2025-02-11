const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TOKEN = 'MTMzODgxMjM4OTkzOTg3MTgyNA.GTm-L_.AxOOHBxgxFYtGTcDIeh622opRfbPCYSNUoRFWc';  // ضع التوكن هنا
const JIKAN_API_URL = 'https://api.jikan.moe/v4/news';

client.once('ready', () => {
  console.log('بوت الأنمي جاهز!');
});

client.on('messageCreate', async message => {
  if (message.content.toLowerCase() === '!anime_news') {
    try {
      // جلب آخر أخبار الأنمي
      const response = await axios.get(JIKAN_API_URL);
      const news = response.data.data[0];

      if (news) {
        const { title, excerpt, image_url, url } = news;

        // إنشاء الرسالة المدمجة
        const embed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(excerpt)
          .setURL(url)
          .setImage(image_url)
          .setFooter({ text: `المصدر: ${url}` });

        // إرسال الرسالة إلى القناة
        message.channel.send({ embeds: [embed] });
      } else {
        message.channel.send('لا توجد أخبار جديدة.');
      }
    } catch (error) {
      console.error(error);
      message.channel.send('حدث خطأ أثناء جلب الأخبار.');
    }
  }
});

// تسجيل البوت
client.login(TOKEN);
