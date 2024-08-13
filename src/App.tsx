
import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/reducer";
import { addTodo, toggleTodo, editTodo, deleteTodo, setTodos, setCompletedTodos } from "./redux/action";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const completedTodos = useSelector((state: RootState) => state.todos.completedTodos);

  const [todo, setTodo] = React.useState<string>("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch(addTodo(Date.now(), todo, false));
      setTodo("");
    }
  };

const onDragEnd = (result: DropResult) => {
  const { destination, source } = result;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  let movedItem;
  let active = [...todos];
  let complete = [...completedTodos];

  if (source.droppableId === "TodosList") {
    movedItem = active[source.index];
    active.splice(source.index, 1);
  } else {
    movedItem = complete[source.index];
    complete.splice(source.index, 1);
  }

  if (destination.droppableId === "TodosList") {
    active.splice(destination.index, 0, movedItem);
  } else {
    complete.splice(destination.index, 0, movedItem);
  }

  dispatch(setTodos(active));
  dispatch(setCompletedTodos(complete));
};


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task Tracker</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={(newTodos) => dispatch({ type: "SET_TODOS", payload: newTodos })}
          CompletedTodos={completedTodos}
          setCompletedTodos={(newCompletedTodos) => dispatch({ type: "SET_COMPLETED_TODOS", payload: newCompletedTodos })}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
