import { Message } from "typegram";
import { Telegraf } from "telegraf";

import config from "./config";

import bot from "./lib/bot";
import echo from "./commands/echo";
import message from "./commands/message";

import { toEscapeMsg } from "./utils/messageHandler";

const schedule = require("node-schedule");
//Production Settings
if (process.env.NODE_ENV === "production") {
  //Production Logging
  bot.use((ctx, next) => {
    if (ctx.message && config.LOG_GROUPID) {
      let userInfo: string;
      if (ctx.message.from.username) {
        userInfo = `name: [${toEscapeMsg(
          ctx.message.from.first_name,
        )}](tg://user?id=${ctx.message.from.id}) \\(@${toEscapeMsg(
          ctx.message.from.username,
        )}\\)`;
      } else {
        userInfo = `name: [${toEscapeMsg(
          ctx.message.from.first_name,
        )}](tg://user?id=${ctx.message.from.id})`;
      }
      const text = `\ntext: ${
        (ctx.message as Message.TextMessage).text
      }`;
      const logMessage = userInfo + toEscapeMsg(text);
      bot.telegram.sendMessage(config.LOG_GROUPID, logMessage, {
        parse_mode: "MarkdownV2",
      });
    }
    return next();
  });
  // bot.launch({
  //   webhook: {
  //     domain: config.URL,
  //     port: Number(config.PORT),
  //   },
  // });
} else {
  //Development logging
  bot.use(Telegraf.log());
  bot.launch();
}

const timeString = "2023-12-11T09:21:00Z";
const time = new Date(timeString);

const month = time.getUTCMonth() + 1;
const day = time.getUTCDate();
const hour = time.getUTCHours();
const minute = time.getUTCMinutes();

// const cronExpression = `${minute} ${hour} ${day} ${month} *`;

const deadlines = [5, 15, 30];

const dates = deadlines.map((x) => {
  var t = new Date();
  t.setSeconds(t.getSeconds() + x);

  return [t, x];
});

echo();
// dates.forEach((x) => {
//   schedule.scheduleJob(x[0], message(x[1]));
// });

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
