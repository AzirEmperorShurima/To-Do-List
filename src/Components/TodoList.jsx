import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { DragDropContext, Droppable, Draggable } = window.ReactBeautifulDnd;

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [itemToRemove, setItemToRemove] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            setTasks(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleAdd = () => {
        if (!newTask.trim()) {
            toast.error("Vui lòng nhập nhiệm vụ!");
            return;
        }
        if (tasks.some(task => task.text.toLowerCase() === newTask.trim().toLowerCase())) {
            toast.error("Nhiệm vụ đã tồn tại!");
            return;
        }
        setTasks([
            ...tasks,
            { text: newTask.trim(), completed: false }
        ]);
        toast.success("Đã thêm nhiệm vụ!");
        setNewTask("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const handleRemove = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
        toast.error("Đã xóa nhiệm vụ!");
    };

    const handleToggle = (index) => {
        setTasks(tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        ));
        toast.info(task => task.completed ? "Đã bỏ hoàn thành nhiệm vụ!" : "Đã hoàn thành nhiệm vụ!");
    };

    const handleClearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
        toast.info("Đã xóa tất cả nhiệm vụ đã hoàn thành!");
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(tasks);
        const [removed] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, removed);
        setTasks(items);
        toast.info("Đã sắp xếp lại nhiệm vụ!");
    };

    const confirmRemove = () => {
        if (itemToRemove !== null) {
            handleRemove(itemToRemove);
            setItemToRemove(null);
        }
    };

    const visibleTasks = tasks
        .filter((task) =>
            filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
        )
        .filter((task) =>
            task.text.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Danh Sách Nhiệm Vụ</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    aria-label="Search"
                    placeholder="Tìm kiếm nhiệm vụ..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    aria-label="Filter"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Tất cả</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="incomplete">Chưa hoàn thành</option>
                </select>
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    aria-label="New task"
                    placeholder="Nhập nhiệm vụ mới..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                    Thêm
                </button>
            </div>

            {tasks.some(task => task.completed) && (
                <button
                    onClick={handleClearCompleted}
                    className="mb-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
                >
                    Xóa tất cả đã hoàn thành
                </button>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <ul
                            className="space-y-3"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {visibleTasks.length === 0 ? (
                                <li className="text-center text-gray-500">Không có nhiệm vụ nào</li>
                            ) : (
                                visibleTasks.map((task, idx) => (
                                    <Draggable key={idx} draggableId={`${idx}`} index={idx}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
                                            >
                                                <span
                                                    onClick={() => handleToggle(tasks.indexOf(task))}
                                                    className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                                                >
                                                    {task.text}
                                                </span>
                                                <button
                                                    onClick={() => setItemToRemove(tasks.indexOf(task))}
                                                    className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                                                >
                                                    Xóa
                                                </button>
                                            </li>
                                        )}
                                    </Draggable>
                                ))
                            )}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            {itemToRemove !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <p className="text-gray-800 mb-4">Bạn có chắc muốn xóa nhiệm vụ này?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={confirmRemove}
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                            >
                                Xóa
                            </button>
                            <button
                                onClick={() => setItemToRemove(null)}
                                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default TodoList;