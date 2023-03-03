"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../../utils/modules/respond");
exports.default = {
    name: "brand",
    description: "🎮 Try Gussing The Brand.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        var x = [
            "https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/308669181_165687929462895_2453032355492059696_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rjnPthKg4UwAX9r15Yo&_nc_ht=scontent.fcai19-1.fna&oh=00_AfAwGtUbHknuDzfTKH0hj5jg82Du48b2rLKdX_1VJkF8dA&oe=63FB45C8",
            "https://logos-world.net/wp-content/uploads/2020/11/Nvidia-Emblem.png",
            "https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s900-c-k-c0x00ffffff-no-rj",
            "https://www.cnet.com/a/img/resize/95e4fd9f8b5355093a36a355fcb4b71a7ed34f25/hub/2019/11/13/026c1811-17e6-4fdc-a144-b7ca1c43f093/brave-logo-icon-gradient.jpg?auto=webp&fit=crop&height=1200&width=1200",
            "https://www.hollywoodreporter.com/wp-content/uploads/2017/11/06-musical-ly.w710.h473.2x_-_h_2017.jpg?w=1296",
            "https://www.albayan.ae/polopoly_fs/1.3614247.1564167771!/image/image.png",
            "https://www.investopedia.com/thmb/DNrU2SOx4AYYiLm9wWSJcsgzmEg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Reddit-Logo-e9537b96b55349ac8eb77830f8470c95.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/2560px-1960s_Gucci_Logo.svg.png",
            "https://img1.arabpng.com/20180508/poq/kisspng-rolls-royce-holdings-plc-rolls-royce-ghost-rolls-r-5af14c01514612.9860117315257630733329.jpg",
            "https://th.bing.com/th/id/R.c5ae7e8b88725d1c0f20f76a7384ef60?rik=ryJVVzLEEJLEug&pid=ImgRaw&r=0",
            "https://static.dezeen.com/uploads/2020/07/toyota-rebrand-logo-design_dezeen_2364_sq_1.jpg",
            "https://purepng.com/public/uploads/large/purepng.com-citroen-logocitroenfrench-automobilepsa-peugeot-citroen-grouptraction-avantcarslogo-1701527479396r7lrq.png",
        ];
        if (lang == "en") {
            var x2 = [
                "nike",
                "nvidea",
                "youtube",
                "brave",
                "musically",
                "twitter",
                "reddit",
                "gucci",
                "rolls royce",
                "ferrari",
                "toyota",
                "citroen",
            ];
        }
        else {
            var x2 = [
                "نايك",
                "انفيديا",
                "يوتيوب",
                "براف",
                "ميوزكلي",
                "تويتر",
                "ريدت",
                "جوتشي",
                "رولز رويلز",
                "فيراري",
                "تويوتا",
                "استروين",
            ];
        }
        var x3 = Math.floor(Math.random() * x.length);
        var embed = new discord_js_1.MessageEmbed()
            .setImage(`${x[x3]}`)
            .setColor("YELLOW")
            .setDescription("⚠" + `** You Have ` + 17 + `s To Type The Correct Answer!**`);
        (0, respond_1.respond)(interaction, message, { embeds: [embed] }, isSlash).then(async (br) => {
            let cal = channel
                .createMessageCollector({
                time: 1000 * 17,
            })
                .on("collect", async (msg) => {
                if (msg.author.bot)
                    return;
                if (msg.content.toLowerCase() !== x2[x3])
                    return;
                cal.stop("external");
                (0, respond_1.respond)(interaction, message, {
                    embeds: [
                        {
                            description: `**${msg.author}** Has typed the correct answer 🎉`,
                            color: "GREEN",
                        },
                    ],
                }, isSlash);
                var points = await db.get(`points_${guild?.id}_${msg.author.id}`);
                if (points == null)
                    points = await db.set(`points_${guild?.id}_${msg.author.id}`, {
                        user: msg.author.id,
                        guild: msg.author.id,
                        points: 0,
                    });
                else {
                    await db.add(`points_${guild?.id}_${msg.author.id}.points`, 1);
                }
            })
                .on("end", (collected, reason) => {
                if (reason == "external")
                    return;
                else
                    (0, respond_1.respond)(interaction, message, {
                        embeds: [
                            {
                                color: "RED",
                                title: "❌" + " **Time Out!**",
                                description: `**Time is end and no one type the correct answer**`,
                            },
                        ],
                    }, isSlash);
            });
        });
    },
};
