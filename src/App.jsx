import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    } else {
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEdit = (e, id) => {
    let t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container sm:w-2/3 mx-auto bg-slate-200 p-5 rounded-xl my-5 min-h-[80vh]">
        <h1 className="text-3xl font-bold flex justify-center mb-6 text-violet-950">
          TaskSage: Your Path to Efficient Task Management
        </h1>
        <div className="addTodo flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <input
            className="w-full p-0.5 text-lg rounded-sm px-0.5 bg-violet-50"
            onChange={handleChange}
            value={todo}
            type="text"
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="mb-6 bg-violet-900 disabled:bg-violet-700 text-white cursor-pointer font-bold rounded-md p-2 text-base w-full"
          >
            Save
          </button>
        </div>
        <input
          className="mr-2"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          id=""
        />
        Show finished
        <h2 className="text-2xl font-bold mt-5 mb-3 text-cyan-950">
          Your Todos
        </h2>
        <div className="todos px-5 text-lg bg-cyan-50 border-4 rounded-lg border-cyan-600">
          {todos.length === 0 && (
            <div className="my-5">No Todos to display</div>
          )}
          {todos.map(
            (item) =>
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex flex-col md:flex-row items-start md:items-center justify-between my-5 w-full"
                >
                  <div className="flex gap-5 items-center w-full md:w-auto lg:w[75%] text-wrap">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div
                      className={`${
                        item.isCompleted ? "line-through" : ""
                      } break-words whitespace-normal max-w-[40vw] overflow-hidden`}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full mt-3 md:mt-0">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-900 text-white cursor-pointer hover:bg-slate-900 font-bold rounded-full mx-1 px-3 py-1 text-base"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-900 text-white cursor-pointer hover:bg-slate-900 font-bold rounded-full mx-1 px-3 py-1 text-base"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
