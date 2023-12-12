import { Markup } from "telegraf";

import bot from "../lib/bot";

const echo = () => {
  try {
    bot.command("upcoming", (ctx) =>
      ctx.reply(
        `Upcoming Assignments:
MA1522 Quiz 4 - in 2 days
      `,
      ),
    );
  } catch (error) {
    console.log(error);
  }
};

export default echo;
