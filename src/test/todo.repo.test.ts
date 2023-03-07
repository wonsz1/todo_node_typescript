//@ts-check
import { describe, test, expect } from '@jest/globals';
import { Todo } from '../model/todo';
import { connectDBForTesting, disconnectDBForTesting } from '../test/testDB';

import { addTodo, findTodos, deleteTodo, deleteAllTodos, setDone } from '../repository/todo';

describe('Todo repository', () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });

    test('Add todo', async () => {
        const todo = await addTodo(123, 6, 'test');
        expect(todo).toBeDefined();
        expect(todo.task).toBe('test');
    });

    test('Find todos', async () => {
        const todos = await findTodos(123);
        expect(todos[0].task).toBe('test');
    });

    test('Set done', async () => {
        const result = await setDone(123, 6);
        const todos = await findTodos(123);
        expect(result).toBe(true);
        expect(todos).toBeDefined();
        expect(todos[0].done).toBe(true);
    });

    test('Set done unexisting', async () => {
        const result = await setDone(123, 7);
        expect(result).toBe(false);
    });

    test('Delete todo', async () => {
        await addTodo(123, 3, 'test 3');
        await deleteTodo(123, 3);
        const todos = await findTodos(123);
        todos.forEach(todo => {
            expect(todo.taskId).not.toBe(3);
        });
    });

    test('Delete all todos', async () => {
        await addTodo(123, 1, 'test 1');
        await addTodo(123, 2, 'test 2');
        await deleteAllTodos(123);
        const todos = await findTodos(123);
        expect(todos).toHaveLength(0);
    });

    afterAll(async () => {
        await Todo.collection.drop();
        await disconnectDBForTesting();
    });
});