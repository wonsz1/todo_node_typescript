// @ts-check
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { Router } from "express";
import '../config/db';
import { addTodo, findTodos, deleteTodo, deleteAllTodos } from '../repository/todo';

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
    findTodos(msg.chat.id).then(resp => {
        addTodo(msg.chat.id, resp.length + 1, (msg.text || "").replace('\Add ', '')).then(resp => {
            bot.sendMessage(msg.chat.id, 'Dodano zadanie');
        }).catch(err => {
            bot.sendMessage(msg.chat.id, 'Coś poszło nie tak');
        });
    });
});

bot.onText(/List/, (msg) => {
    findTodos(msg.chat.id).then(resp => {
        let tasks = "";
        resp.forEach((todo: any) => {
            const status = todo.done ? '[done]' : '[todo]';
            tasks += `[${todo.taskId}] ${status} ${todo.task} \n`;
        });
        bot.sendMessage(msg.chat.id, tasks);
    }).catch(err => {
        bot.sendMessage(msg.chat.id, 'Coś poszło nie tak');
    });
});

bot.onText(/Delete/, (msg) => {
    const taskNr: string = (msg.text || "").replace( /^\D+/g, '');
    deleteTodo(msg.chat.id, parseInt(taskNr)).then(resp => {
        bot.sendMessage(msg.chat.id, 'Usunięto zadanie');
    }).catch(err => {
        console.log(err);
        bot.sendMessage(msg.chat.id, 'Coś poszło nie tak');
    });
});

bot.onText(/Del all/, (msg) => {
    deleteAllTodos(msg.chat.id).then(resp => {
        bot.sendMessage(msg.chat.id, 'Usunięto wszystkie zadania');
    }).catch(err => {
        bot.sendMessage(msg.chat.id, 'Coś poszło nie tak');
    });
});

export default router;