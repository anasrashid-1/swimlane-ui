// src/components/TodoList.tsx
import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<Props> = ({
  todos = [],
  setTodos,
  CompletedTodos = [],
  setCompletedTodos,
}) => {
  console.log("Active Todos:", todos);
  console.log("Completed Todos:", CompletedTodos);
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))
            ) : (
              <p>No active tasks</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos.length > 0 ? (
              CompletedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={CompletedTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ))
            ) : (
              <p>No completed tasks</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
