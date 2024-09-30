import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newTitle: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleEditSubmit = () => {
        onEdit(task.id, newTitle);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-between mb-2">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="border p-1 rounded mr-2"
                    />
                    <button onClick={handleEditSubmit} className="bg-green-500 text-white p-1 rounded">Сохранить</button>
                </div>
            ) : (
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        className="mr-2"
                    />
                    <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
                    <button onClick={() => setIsEditing(true)} className="ml-2 bg-yellow-500 text-white p-1 rounded">Редактировать</button>
                    <button onClick={() => onDelete(task.id)} className="ml-2 bg-red-500 text-white p-1 rounded">Удалить</button>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
