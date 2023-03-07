// @ts-check
import mongoose from "mongoose";

const TodoSchmea = new mongoose.Schema({
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

export default mongoose.model("Todo", TodoSchmea);