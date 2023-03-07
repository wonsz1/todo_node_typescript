// @ts-check
import Todo from '../model/todo';

const noTaskMessage = 'Nie masz żadnych zadań.\n Wpisz add <tresc zadania> aby dodać zadanie';

const addTodo = async (uid: Number, taskId: Number, task: string) => {
    const newTodo = new Todo({
        uid,
        taskId,
        task,
        done: false,
        created: new Date()
    });
    await newTodo.save();
}

const findTodos = async (uid: Number) => {
    return await Todo.find({ uid });
};

const deleteTodo = async (uid: Number, taskId: Number) => {
    try {
        await Todo.findOneAndDelete({ uid, taskId });
    } catch (err) {
        console.log(err);
    }
};

const deleteAllTodos = async (uid: Number) => {
    try {
        await Todo.deleteMany({ uid });
    } catch (err) {
        console.log(err);
    }
}

export { addTodo, findTodos, deleteTodo, deleteAllTodos }