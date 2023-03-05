// @ts-check
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { Router } from "express";
import '../config/db';
import { addTodo } from '../repository/todo';

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

bot.onText(/Add/, (msg) => {
    addTodo(msg.chat.id, msg.text).then(resp => {
        bot.sendMessage(msg.chat.id, 'Dodano zadanie');
    }).catch(err => {
        bot.sendMessage(msg.chat.id, 'Coś poszło nie tak');
    });
});

export default router;