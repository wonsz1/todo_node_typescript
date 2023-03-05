// @ts-check
import Todo from '../model/todo';

const noTaskMessage = 'Nie masz żadnych zadań.\n Wpisz add <tresc zadania> aby dodać zadanie';

const addTodo = async (uid: string, task: string) => {
    const newTodo = new Todo({
        uid,
        tasks: [{
            task,
            done: false,
            created: new Date()
        }]
    });
    await newTodo.save();
}

export { addTodo }