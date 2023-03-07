// @ts-check
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { Router } from "express";
import '../config/db';
import { addTodo, findTodos, deleteTodo, deleteAllTodos, setDone } from '../repository/todo';

dotenv.config();

const telegraToken: string = process.env.TELEGRAM_TOKEN || "";
const bot: TelegramBot = new TelegramBot(telegraToken, { polling: true });
const router: Router = Router();

bot.onText(/Start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Wpisz: \n' +
    '<b>List</b> aby wylistować swoje zadania \n' +
    '<b>Add tresc</b> aby dodać zadanie \n' + 
    '<b>Done numer-zadania</b> aby oznaczyć zadanie jako wykonane \n' + 
    '<b>Delete numer-zadania</b> aby usunąć \n' +
    '<b>Del all</b> aby usunąć wszystkie',
    { parse_mode: 'HTML' }
    );
});

bot.onText(/Add/, (msg) => {
    findTodos(msg.chat.id).then(resp => {
        const nextTaskNr: number = (resp.at(-1)?.taskId || 0) + 1;
        addTodo(msg.chat.id, nextTaskNr, (msg.text || "").replace('\Add ', '')).then(resp => {
            bot.sendMessage(msg.chat.id, 'Dodano zadanie');
        }).catch(err => {
            sendErrorResponse(msg.chat.id, err);
        });
    });
});

bot.onText(/List/, (msg) => {
    findTodos(msg.chat.id).then(resp => {
        let tasks: string = "";
        resp.forEach((todo: any) => {
            const status: string = todo.done ? '<done>' : '[todo]';
            tasks += `[${todo.taskId}] ${status} ${todo.task} \n`;
        });

        if (tasks === "") {
            tasks = 'Nie masz jeszcze zadnych zadań!\nWpisz Add i treść zadania aby dodać nowe';
        }

        bot.sendMessage(msg.chat.id, tasks);
    }).catch(err => {
        sendErrorResponse(msg.chat.id, err);
    });
});

bot.onText(/Delete/, (msg) => {
    const taskNr: string = (msg.text || "").replace( /^\D+/g, '');
    deleteTodo(msg.chat.id, parseInt(taskNr)).then(resp => {
        bot.sendMessage(msg.chat.id, 'Usunięto zadanie');
    }).catch(err => {
        sendErrorResponse(msg.chat.id, err);
    });
});

bot.onText(/Del all/, (msg) => {
    deleteAllTodos(msg.chat.id).then(resp => {
        bot.sendMessage(msg.chat.id, 'Usunięto wszystkie zadania');
    }).catch(err => {
        sendErrorResponse(msg.chat.id, err);
    });
});

bot.onText(/Done/, (msg) => {
    const taskNr: string = (msg.text || "").replace( /^\D+/g, '');
    setDone(msg.chat.id, parseInt(taskNr)).then(resp => {
        if (resp) {
            bot.sendMessage(msg.chat.id, 'Zadanie oznaczone jako wykonane');
        } else {
            bot.sendMessage(msg.chat.id, 'Nie ma takiego zadania');
        }
    }).catch(err => {
        sendErrorResponse(msg.chat.id, err);
    });
});

function sendErrorResponse(chatId: number, err: string) {
    bot.sendMessage(chatId, 'Coś poszło nie tak. ' + err);
    console.log(err);
}

export default router;