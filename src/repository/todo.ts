// @ts-check
import { Todo, ITodo } from '../model/todo';

const addTodo = async (uid: number, taskId: number, task: string): Promise<ITodo> => {
    const newTodo = new Todo({
        uid,
        taskId,
        task,
        done: false,
        created: new Date()
    });
    return await newTodo.save();
}

const findTodos = async (uid: number): Promise<Array<ITodo>> => {
    return await Todo.find({ uid });
};

const deleteTodo = async (uid: number, taskId: number): Promise<void> => {
    await Todo.findOneAndDelete({ uid, taskId });
};

const deleteAllTodos = async (uid: number): Promise<void> => {
    await Todo.deleteMany({ uid });
}

const setDone = async (uid: number, taskId: number): Promise<boolean> => {
    return await Todo.findOne({ uid, taskId }).then((todo): boolean => {
        if (todo) {
            todo.done = true;
            todo.save();
            return true
        }
        return false;
    });
}

export { addTodo, findTodos, deleteTodo, deleteAllTodos, setDone }