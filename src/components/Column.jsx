import React from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard.jsx';

export const Column = ({
  column,
  onDelete,
  onEditTask,
  onDragStart,
  onDragOver,
  onDrop,
  onAddTask
}) => {
  const getColumnColor = () => {
    switch (column.status) {
      case 'todo': return 'border-blue-500/30 bg-blue-500/5';
      case 'doing': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'done': return 'border-green-500/30 bg-green-500/5';
      default: return 'border-slate-600/30';
    }
  };

  const getHeaderIcon = () => {
    switch (column.status) {
      case 'todo': return '📋';
      case 'doing': return '⚡';
      case 'done': return '✅';
      default: return '📝';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getHeaderIcon()}</span>
          <div>
            <h2 className="text-xl font-bold text-slate-100">{column.title}</h2>
            <p className="text-sm text-slate-400">{column.tasks.length} tarefas</p>
          </div>
        </div>
        <button
          onClick={() => onAddTask(column.status)}
          className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 
                   text-slate-300 hover:text-slate-100 transition-all duration-200 
                   hover:scale-105 border border-slate-600/30"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`
          flex-1 p-4 rounded-xl border-2 border-dashed transition-all duration-300
          ${getColumnColor()}
        `}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.status)}
      >
        <div className="space-y-3">
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEditTask}
              onDragStart={onDragStart}
            />
          ))}
          
          {column.tasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-2 opacity-50">
                {getHeaderIcon()}
              </div>
              <p className="text-slate-400 text-sm">
                {column.status === 'todo' && 'Adicione uma nova tarefa'}
                {column.status === 'doing' && 'Arraste uma tarefa aqui'}
                {column.status === 'done' && 'Nenhuma tarefa concluída ainda'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};