// @ts-check
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();

const telegraToken: string = process.env.TELEGRAM_TOKEN || "";
const bot = new TelegramBot(telegraToken, { polling: true });
const router = Router();


bot.onText(/Start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Wpisz: \n' +
    '<b>/list</b> aby wylistować swoje zadania \n' +
    '<b>/add tresc</b> aby dodać zadanie \n' + 
    '<b>/done numer-zadania</b> aby oznaczyć zadanie jako wykonane \n' + 
    '<b>/del numer-zadania</b> aby usunąć \n' +
    '<b>/del all</b> aby usunąć wszystkie',
    { parse_mode: 'HTML' }
    );
});

export default router;