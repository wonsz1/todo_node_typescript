// @ts-check
import { Schema, model } from "mongoose";
import ITodo from "../model/ITodo";

const TodoSchmea = new Schema<ITodo>({
    uid: {
        type: Number,
    },
    taskId: {
        type: Number,
    },
    task: {
        type: String,
        minLength: [3, "Za którka treść, podaj min. 3 znaki"],
        maxLength: [255, "Za długa treść, podaj max. 255 znaki"]
    },
    done: {
        type: Boolean,
    },
    created: {
        type: Date,
    }
});

export default model("Todo", TodoSchmea);