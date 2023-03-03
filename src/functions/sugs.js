"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
  msg: async (msg, db) => {
    if (msg.author.bot) {
      if (msg.components[0]?.components[0]?.customId !== "up") return;
      let key = "SuggestionsLogsChannel_" + msg.guild?.id;
      let data2 = await db.get(key);
      let channel = msg.guild?.channels.cache.get(data2?.channel);
      if (!channel) return;
      if (channel.isText())
        channel.send({
          content: "new **Suggestion** here: " + msg.url,
          embeds: [
            new discord_js_1.MessageEmbed({
              color: "YELLOW",
              description: `**\`\`\`\n${msg.embeds[0].description}\`\`\`**\nBy: @${msg.embeds[0].author?.name}`,
              footer: { text: "AT." },
              timestamp: Number(msg.embeds[0].timestamp) | 0,
            }),
          ],
          components: [
            new discord_js_1.MessageActionRow().addComponents(
              new discord_js_1.MessageButton()
                .setCustomId("remove_" + msg.id)
                .setStyle("DANGER")
                .setLabel("🗑️ Remove")
            ),
          ],
        });
    } else {
      if (!msg.guild?.id) return;
      let key = "SuggestionsChannel_" + msg.guild?.id;
      let guild = msg.guild;
      let channel = msg.channel;
      let msgAuthor = msg.author;
      let rawEContent = msg["content"];
      let data2 = await db.get(key);
      if (data2 == null) return;
      if (msg.channelId !== data2.channel) return;
      if (msg.deletable) msg.delete();
      channel
        .send({
          embeds: [
            {
              author: {
                name: msgAuthor.username,
                iconURL: msgAuthor.avatarURL({ dynamic: true }) || "",
              },
              color: 0x2c2f33,
              timestamp: new Date(),
              footer: {
                iconURL: guild.iconURL({ dynamic: true }) || "",
                text: guild.name,
              },
              description: rawEContent,
              fields: [
                { name: "👍 Up votes:", value: "```\n0```", inline: true },
                { name: "👎 Down votes:", value: "```\n0```", inline: true },
              ],
            },
          ],
          components: [
            new discord_js_1.MessageActionRow().addComponents(
              new discord_js_1.MessageButton()
                .setCustomId("up")
                .setStyle("DANGER")
                .setLabel("👍 Up"),
              new discord_js_1.MessageButton()
                .setCustomId("down")
                .setStyle("DANGER")
                .setLabel("👎 Down"),
              new discord_js_1.MessageButton()
                .setCustomId("info")
                .setStyle("SECONDARY")
                .setLabel("❓ Who Voted")
            ),
          ],
        })
        .then(async (message) => {
          let dataConstructor = {
            url: message.url.toString(),
            content: rawEContent,
          };
          let userKey =
            "Suggestions_" +
            msg.guild?.id +
            "_" +
            msg.author.id.toString() +
            ".sugs";
          let udata = await db.get(userKey);
          let value = { voters: [], votersInfo: [] };
          let key = message.id.toString();
          if (udata == null) await db.set(userKey, [dataConstructor]);
          else await db.push(userKey, dataConstructor);
          await db.set(key, value);
        });
    }
  },
  buttons: async (interaction, db) => {
    await interaction.deferUpdate().catch(() => {});
    if (interaction.customId.startsWith("remove_")) {
      let id = interaction.customId.split("remove_").join("");
      let key = "SuggestionsChannel_" + interaction.guild?.id;
      let trtr = await db.get(key);
      if (trtr?.channel) {
        let c = interaction.guild?.channels.cache.get(trtr?.channel);
        if (c?.isText()) {
          (
            await interaction.channel?.messages.fetch(
              interaction.message.id || ""
            )
          )?.edit({
            content: "Suggestion has removed.",
            embeds: [],
            components: [],
          });
          let m = await c.messages.fetch(id);
          // trying to get the user
          let u = interaction.guild?.members.cache.find(
            (o) => o.user.username == m.embeds[0].author?.name
          );
          if (u)
            u.send({
              content:
                "your suggestion in **" +
                interaction.guild?.name +
                "** has removed by admins...",
            }).catch(() => {});
          let userKey =
            "Suggestions_" + interaction.guild?.id + "_" + u?.id + ".sugs";
          let key2 = id.toString();
          let data32 = await db.get(userKey);
          let newD = [];
          data32?.forEach(async (d) => {
            if (d.content !== m.embeds[0].description) {
              newD.push({
                url: d.url,
                content: d.content,
              });
            }
          });
          setTimeout(async () => {
            await db.set(userKey, newD);
            await db.delete(key2);
            if (m && m.deletable) m.delete();
          }, 6574);
        }
      }
    } else {
      switch (interaction.customId) {
        case "up":
          {
            let message = interaction.message;
            let embed = message.embeds[0];
            if (!embed.fields) return;
            let dater = new Date().getTime(); //`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            let key = message.id.toString() + ".voters";
            let ke2 = message.id.toString() + ".votersInfo";
            let value = { user: interaction.user, date: dater };
            let newNumber =
              Number(embed.fields[0]?.value.split("```\n")[1].split("```")[0]) +
              1;
            let brbrb = await db.get(message.id.toString());
            let voter = brbrb?.voters;
            if (voter.includes(interaction.user.id))
              return interaction.followUp({
                content: "You have voted for this suggestion before.",
                ephemeral: true,
              });
            let editedEmbed = {
              author: embed.author,
              color: embed.color,
              timestamp: embed.timestamp,
              footer: embed.footer,
              description: embed.description,
              fields: [
                {
                  name: "👍 Up votes:",
                  value: `\`\`\`\n${newNumber}\`\`\``,
                  inline: true,
                },
                embed.fields[1],
              ],
            };
            await db.push(key, interaction.user.id);
            await db.push(ke2, value);
            (await interaction.channel?.messages.fetch(message.id || ""))?.edit(
              {
                components: message.components,
                embeds: [editedEmbed],
              }
            );
          }
          break;
        case "down":
          {
            let message = interaction.message;
            let embed = message.embeds[0];
            if (!embed.fields) return;
            let dater = new Date().getTime(); //`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            let key = message.id.toString() + ".voters";
            let ke2 = message.id.toString() + ".votersInfo";
            let value = { user: interaction.user, date: dater };
            let newNumber =
              Number(embed.fields[1].value.split("```\n")[1].split("```")[0]) +
              1;
            let brbrb = await db.get(message.id.toString());
            let voter = brbrb?.voters;
            if (voter && voter?.includes(interaction.user.id))
              return interaction.followUp({
                content: "You have voted for this suggestion before.",
                ephemeral: true,
              });
            let editedEmbed = {
              author: embed.author,
              color: embed.color,
              timestamp: embed.timestamp,
              footer: embed.footer,
              description: embed.description,
              fields: [
                embed.fields[0],
                {
                  name: "👎 Down votes:",
                  value: `\`\`\`\n${newNumber}\`\`\``,
                  inline: true,
                },
              ],
            };
            await db.push(key, interaction.user.id);
            await db.push(ke2, value);
            (await interaction.channel?.messages.fetch(message.id || ""))?.edit(
              {
                components: message.components,
                embeds: [editedEmbed],
              }
            );
          }
          break;
        case "info":
          {
            let dber = await db.get(interaction.message.id.toString());
            let voters = dber?.votersInfo;
            let raws =
              voters
                ?.map(
                  (voter, index) =>
                    `${index + 1}. ${
                      voter.user.username
                    } - <t:${require("moment")(voter.date).unix()}:R>`
                )
                .join("\n") || null;
            if (!raws)
              return interaction.followUp({
                content: "There are no voters",
                ephemeral: true,
              });
            interaction.followUp({ content: raws, ephemeral: true });
          }
          break;
        default:
          break;
      }
    }
  },
};
