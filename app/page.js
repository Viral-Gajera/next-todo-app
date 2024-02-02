"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import fetchData from "@/lib/fetchData";

export default function Home() {
    let [action, setAction] = useState("Add");
    let [intput, setInput] = useState();
    let [tasks, setTasks] = useState([]);
    let [taskId, setTaskId] = useState();
    let [filter, setFilter] = useState(-1);

    async function submit() {
        if (action == "Add") {
            let res = await fetchData("POST", "/api/task", { task: intput });
            setInput("");
            setTasks((old) => {
                return [...old, res.data];
            });
            if (res.is_success) {
                toast.success("Task added");
            }
        } else {
            let res = await fetchData("PUT", "/api/task", {
                id: taskId,
                task: intput,
            });
            console.log("Hello");
            console.log(res);
            setTasks((old) => {
                return [
                    ...old.map((e) => {
                        if (res.data.id == e.id) {
                            return { ...e, task: res.data.task };
                        }
                        return e;
                    }),
                ];
            });
            setInput("");
            if (res.is_success) {
                toast.success("Task edited");
            }
        }
    }

    async function addTask() {
        document.getElementById("my_modal").showModal();
        setAction("Add");
        setInput("");
    }

    async function toogleTask(id, status) {
        let res = await fetchData("PATCH", "/api/task", {
            id: id,
            status: !status,
        });
        setTasks((old) => {
            return [
                ...old.map((e) => {
                    if (res.data.id == e.id) {
                        return { ...e, status: res.data.status };
                    }
                    return e;
                }),
            ];
        });
        if (res.is_success) {
            if (status) {
                toast.success("Task marked as incomplete");
            } else {
                toast.success("Task marked as complete");
            }
        }
    }

    async function editTask(id, task) {
        document.getElementById("my_modal").showModal();
        setInput(task);
        setAction("Edit");
        setTaskId(id);
    }

    async function deleteTask(id) {
        let res = await fetchData("DELETE", "/api/task", { id: id });
        console.log(res.data.id);
        setTasks((old) => {
            return [...old.filter((e) => e.id != res.data.id)];
        });
        if (res.is_success) {
            toast.success("Task deleted");
        }
    }

    useEffect(() => {
        (async () => {
            let response = await fetchData("GET", `/api/task`);
            setTasks(response.data);
            console.log(response.data);
        })();
    }, []);

    return (
        <section className="flex flex-col w-[800px] mx-auto ">
            {/* Header */}
            <header className="flex items-center justify-center my-5 text-xl font-semibold rounded">
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={50}
                    height={50}
                ></Image>
                <span className="text-first">Todo</span>
            </header>

            {/* Add task And Filtering */}
            <section>
                {/* Add task */}
                <div className="mt-5">
                    <button
                        className="w-full text-white bg-first btn hover:bg-[#3e89ff]"
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>

                {/* Filtering */}
                <div className="mt-2">
                    <select
                        className="w-full select select-bordered"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option selected value={-1}>
                            Filter
                        </option>
                        <option value={1}>Completed</option>
                        <option value={0}>Uncomplete</option>
                    </select>
                </div>
            </section>

            {/* Table */}
            <section>
                <div className="mt-10 overflow-hidden rounded">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-base-200">
                                <th></th>
                                <th>Task</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => {
                                if (filter == -1) {
                                } else if (filter != task.status) {
                                    return undefined;
                                }
                                return (
                                    <tr key={index}>
                                        <th className="w-[50px]">
                                            <div className="form-control h-[30px]">
                                                <label
                                                    className="p-0.5 m-0 cursor-pointer label"
                                                    onClick={() =>
                                                        toogleTask(
                                                            task.id,
                                                            task.status
                                                        )
                                                    }
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={task.status}
                                                        className="checkbox [--chkbg:#3e70ef] [--chkfg:#fff]"
                                                    />
                                                </label>
                                            </div>
                                        </th>
                                        <td className="text-base">
                                            {task.task}
                                        </td>
                                        <td className="flex items-center gap-3">
                                            <FaRegEdit
                                                className="text-gray-500 text-[20px] active:text-first"
                                                onClick={() =>
                                                    editTask(task.id, task.task)
                                                }
                                            />
                                            <MdDelete
                                                className="text-gray-500 text-[22px] active:text-red-400"
                                                onClick={() =>
                                                    deleteTask(task.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Dialogbox */}
            <dialog id="my_modal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">{action} Task</h3>
                    <div className="py-4">
                        <input
                            type="text"
                            placeholder="Type here"
                            className="w-full input input-bordered"
                            value={intput}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="py-1 btn bg-first"
                                onClick={submit}
                            >
                                <span className="mx-2 text-white">
                                    {action}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Toaster position="top-right" />
        </section>
    );
}
