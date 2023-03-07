// @ts-check
import { Schema, model } from "mongoose";
interface ITodo {
    uid: number;
    taskId: number;
    task: string;
    done: boolean;
    created: Date;
}

const TodoSchmea = new Schema<ITodo>({
    uid: {
        type: Number, required: true
    },
    taskId: {
        type: Number, required: [true, "tesk number required"]
    },
    task: {
        type: String,
        minLength: [3, "Za którka treść, podaj min. 3 znaki"],
        maxLength: [255, "Za długa treść, podaj max. 255 znaki"]
    },
    done: {
        type: Boolean, default: false
    },
    created: {
        type: Date, default: Date.now
    }
});

const todoModel = model<ITodo>("Todo", TodoSchmea);
export { todoModel as Todo, ITodo }