import { Todo } from "../models/models";

// src/redux/actions.ts
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const SET_TODOS = "SET_TODOS";
export const SET_COMPLETED_TODOS = "SET_COMPLETED_TODOS";

interface SetTodosAction {
  type: typeof SET_TODOS;
  payload: Todo[];
}

interface SetCompletedTodosAction {
  type: typeof SET_COMPLETED_TODOS;
  payload: Todo[];
}


interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: { id: number; todo: string; isDone: boolean };
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: number; // id of the todo
}

interface EditTodoAction {
  type: typeof EDIT_TODO;
  payload: { id: number; todo: string };
}

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: number; // id of the todo
}


  export type TodoActionTypes =
  | AddTodoAction
  | ToggleTodoAction
  | EditTodoAction
  | DeleteTodoAction
  | SetTodosAction
  | SetCompletedTodosAction;

export const addTodo = (id: number, todo: string, isDone: boolean): TodoActionTypes => ({
  type: ADD_TODO,
  payload: { id, todo, isDone },
});

export const toggleTodo = (id: number): TodoActionTypes => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const editTodo = (id: number, todo: string): TodoActionTypes => ({
  type: EDIT_TODO,
  payload: { id, todo },
});

export const deleteTodo = (id: number): TodoActionTypes => ({
  type: DELETE_TODO,
  payload: id,
});

export const setTodos = (todos: Todo[]): TodoActionTypes => ({
  type: SET_TODOS,
  payload: todos,
});

export const setCompletedTodos = (completedTodos: Todo[]): TodoActionTypes => ({
  type: SET_COMPLETED_TODOS,
  payload: completedTodos,
});