const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../settings');
const tharuzz_footer = "> *© 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 | | 𝚃𝙷𝙰𝚁𝚄𝚉𝚉 𝙳𝙴𝚅*";
const tharuzz_image = "https://i.ibb.co/3yz3Spt9/Tharusha-Md.jpg";
const tharuzz_channelJid = "120363411607943828@newsletter";
const tharuzz_newsletterName = "тнαяυѕнα-м∂";


const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: tharuzz_channelJid,
            newsletterName: tharuzz_newsletterName,
            serverMessageId: 143,
        },
    };
};

const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText = `👋 ℍ𝕖𝕪 @${userName}!

*𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕥𝕠 ${metadata.subject}* 🏡  
You’re member #${groupMembersCount} — glad you joined!  

🕒 *\`𝕛𝕠𝕚𝕟 𝕥𝕚𝕞𝕖:\`* ${timestamp}  
📌 *\`𝔾𝕣𝕠𝕦𝕡 𝕕𝕖𝕤𝕔𝕣𝕚𝕡𝕥𝕚𝕠𝕟:\`*  
${desc}

Make yourself at home and follow the rules to keep the vibe cool!  

${tharuzz_footer}`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText = `😔 @${userName} 𝕙𝕒𝕤 𝕝𝕖𝕗𝕥 𝕥𝕙𝕖 𝕘𝕣𝕠𝕦𝕡.

🕒 *\`𝕃𝕖𝕗𝕥 𝕥𝕚𝕞𝕖:\`* ${timestamp}  
👥 *\`ℝ𝕖𝕞𝕒𝕚𝕟𝕚𝕟𝕘 𝕞𝕖𝕞𝕖𝕓𝕖𝕣𝕤:\`* ${groupMembersCount}  

We wish you all the best!  
👋 *𝕋ℍ𝔸ℝ𝕌𝕊ℍ𝔸-𝕄𝔻 𝕤𝕒𝕪𝕤 𝕘𝕠𝕠𝕕𝕓𝕪𝕖.*

${tharuzz_footer}`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `⚠️ *Admin Notice*

@${demoter} 𝕙𝕒𝕤 𝕣𝕖𝕞𝕠𝕧𝕖𝕕 @${userName} 𝕗𝕣𝕠𝕞 𝕒𝕕𝕞𝕚𝕟 🔻  

🕒 *\`𝕋𝕚𝕞𝕖:\`* ${timestamp}  
📢 *\`𝔾𝕣𝕠𝕦𝕡:\`* ${metadata.subject}

${tharuzz_footer}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `🎉 *Admin Notice*

@${promoter} has promoted @${userName} to admin! 🛡️  

🕒 *\`𝕋𝕚𝕞𝕖:\`* ${timestamp}  
📢 *\`𝔾𝕣𝕠𝕦𝕡:\`* ${metadata.subject}  

Give a warm welcome to our new leader!

${tharuzz_footer}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
