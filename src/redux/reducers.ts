// src/redux/reducers.ts
import { ADD_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO, TodoActionTypes,SET_TODOS, SET_COMPLETED_TODOS } from "./action";

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

interface TodoState {
  todos: Todo[];
  inprogressTodo: Todo[];
  completedTodos: Todo[];
}

const initialState: TodoState = {
  todos: [],
  inprogressTodo: [],
  completedTodos: [],
};

const todoReducer = (state = initialState, action: TodoActionTypes): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
        completedTodos: state.completedTodos.map(todo =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo
        ),
        completedTodos: state.completedTodos.map(todo =>
          todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        completedTodos: state.completedTodos.filter(todo => todo.id !== action.payload),
      };
      case SET_TODOS:
        return {
          ...state,
          todos: action.payload,
        };
      case SET_COMPLETED_TODOS:
        return {
          ...state,
          completedTodos: action.payload,
        };
    default:
      return state;
  }
};

export default todoReducer;
