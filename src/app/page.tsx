"use client";

import React, { useState } from 'react';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types/Task';

const Page: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Первая задача', completed: false },
        { id: 2, title: 'Вторая задача', completed: false },
    ]);

    const addTask = (newTask: Omit<Task, 'id'>) => {
        setTasks((prevTasks) => [
            ...prevTasks,
            { ...newTask, id: Date.now() },
        ]);
    };

    const handleToggle = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleDelete = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const handleEdit = (id: number, newTitle: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Список задач</h1>
            <TaskForm onAddTask={addTask} />
            <TaskList
                tasks={tasks}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
};

export default Page;
