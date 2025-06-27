import React from 'react';
import { Calendar, Trash2, GripVertical, Edit3 } from 'lucide-react';

export const TaskCard = ({ task, onDelete, onEdit, onDragStart }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'done';
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className={`
        group relative bg-slate-800 backdrop-blur-sm border border-slate-700 
        rounded-xl p-4 cursor-grab active:cursor-grabbing
        hover:bg-slate-700 hover:border-slate-600 hover:shadow-lg hover:shadow-blue-500/10
        transition-all duration-300 transform hover:-translate-y-1
        ${isOverdue() ? 'border-red-500/50 bg-red-950/30' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-semibold text-slate-100 text-sm leading-tight">
            {task.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => onEdit(task)}
            className="text-slate-400 hover:text-blue-400 p-1 rounded-md hover:bg-blue-500/10 transition-all duration-200"
            title="Editar tarefa"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-slate-400 hover:text-red-400 p-1 rounded-md hover:bg-red-500/10 transition-all duration-200"
            title="Deletar tarefa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-slate-300 text-xs mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className={`
          flex items-center gap-1 text-xs
          ${isOverdue() ? 'text-red-400' : 'text-slate-400'}
        `}>
          <Calendar className="w-3 h-3" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        
        <div className={`
          w-2 h-2 rounded-full
          ${task.status === 'todo' ? 'bg-blue-500' : ''}
          ${task.status === 'doing' ? 'bg-yellow-500' : ''}
          ${task.status === 'done' ? 'bg-green-500' : ''}
        `} />
      </div>

      {isOverdue() && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      )}
    </div>
  );
};