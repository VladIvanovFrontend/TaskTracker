import React, { useState } from 'react';
import { Task } from '@/types/Task';

interface TaskFormProps {
    onAddTask: (task: Omit<Task, 'id'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            onAddTask({ title: taskTitle, completed: false });
            setTaskTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex mb-4">
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Введите название задачи"
                className="border p-2 rounded mr-2 flex-grow"
            />
            <button type="submit" className="bg-blue-500 text-white">Добавить</button>
        </form>
    );
};

export default TaskForm;
