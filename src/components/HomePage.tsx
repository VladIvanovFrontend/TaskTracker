import React, { useState, useEffect } from 'react';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const HomePage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask: Omit<Task, 'id'>) => {
        setTasks((prevTasks) => [
            ...prevTasks,
            { ...newTask, id: Date.now() },
        ]);
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (id: number, newTitle: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        ));
    };

    return (
        <div>
            <h1>Список задач</h1>
            <TaskForm onAddTask={addTask}/>
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
        </div>
    );
};

export default HomePage;
