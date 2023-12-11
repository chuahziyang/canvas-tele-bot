import bot from "../lib/bot";

const userID = 571889705;
const userName = "Farhan";
const mod = "CS1101S";
const work = "Quiz 3";

//@ts-ignore
const message = (x) => () => {
  try {
    bot.telegram.sendMessage(
      userID,
      `Hi ${userName}, your ${mod} ${work} is due in ${
        60 - x
      } seconds!`,
    );
  } catch (error) {
    console.log(error);
  }
};

export default message;
