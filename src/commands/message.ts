import bot from "../lib/bot";

const userID = 512228580
const userName  = "Farhan"
const mod = "CS1101S"
const work  = "Quiz 3"
const deadline = "3 hours"

const message = () => {
    try {
        bot.on("message", (ctx) =>
            ctx.telegram.sendMessage(userID, `Hi ${userName}, your ${mod} ${work} is due in ${deadline}!`)
        );
      } catch (error) {
        console.log(error);
      }
}

export default message