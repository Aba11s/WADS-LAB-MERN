import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, modifyTodo, removeTodo } from "../features/todo/todoSlice";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const MyTaskComponent = () => {
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector((state) => state.todo);

  // updating tasks
  const handleUpdateTask = async () => {
    if (!editingTask) {
      toast.error("No task selected for updating");
      return;
    }

    try {
      await dispatch(modifyTodo({
        id: editingTask._id,
        data: {
          todo_name: updatedTitle,
          todo_desc: updatedDesc,
        }
      })).unwrap();

      toast.success("Task updated successfully!");
      setEditingTask(null);
      dispatch(fetchTodos());  // Refresh list
    } catch (error) {
      console.error("Update task error:", error);
      toast.error(`Failed to update task: ${error.message || error}`);
    }
  };

  // editing state
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");

   const startEditing = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.todo_name);
    setUpdatedDesc(task.todo_desc);
  };

  // deleting tasks
  const handleDeleteTask = async (id) => {
  try {
      await dispatch(removeTodo(id)).unwrap();
      toast.success("Task deleted successfully!");
      dispatch(fetchTodos()); // Refresh the list after deleting
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p className="text-gray-600">Loading tasks...</p>}

      {!isLoading && todos.length === 0 && (
        <p className="text-gray-500">No tasks available.</p>
      )}

      {!isLoading &&
        todos.map((task) => (
          <div
            key={task._id}
            className="flex flex-col gap-2 mt-2 p-3 text-white bg-green-700 rounded-md shadow-md"
          >
            <h1 className="text-xl font-semibold mb-2">{task.todo_name}</h1>
            <p className="text-sm text-gray-100">{task.todo_desc}</p>

            <div className="flex w-full justify-end items-center gap-4 mt-4">
              <button
                className="btn btn-primary text-white flex gap-1 px-3"
                onClick={() => startEditing(task)}
              >
                <FaRegEdit className="text-base" />
                Edit
              </button>

              <button
                className="btn btn-error bg-red-600 text-white flex gap-1 px-3"
                onClick={() => handleDeleteTask(task._id)}
              >
                <MdDeleteOutline className="text-lg" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {editingTask && (
          <dialog id="edit-modal" open className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Update Task</h3>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="input input-bordered w-full my-2"
              />
              <textarea
                value={updatedDesc}
                onChange={(e) => setUpdatedDesc(e.target.value)}
                className="textarea textarea-bordered w-full my-2"
              />
              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateTask}
                >
                  Save
                </button>
                <button
                  className="btn"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        )}
    </div>
  );
};

export default MyTaskComponent;
