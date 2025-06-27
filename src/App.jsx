import React, { useState } from 'react';
import { ListTodo, Moon } from 'lucide-react';
import { useTasks } from './hooks/useTasks.js';
import { Column } from './components/Column.jsx';
import { AddTaskModal } from './components/AddTaskModal.jsx';

function App() {
  const { columns, addTask, moveTask, deleteTask, updateTask } = useTasks();
  const [draggedTask, setDraggedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('todo');
  const [editingTask, setEditingTask] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (draggedTask) {
      moveTask(draggedTask.id, draggedTask.status, targetStatus);
      setDraggedTask(null);
    }
  };

  const handleAddTask = (status) => {
    setEditingTask(null);
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalStatus(task.status);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const totalTasks = columns.reduce((sum, column) => sum + column.tasks.length, 0);
  const completedTasks = columns.find(col => col.status === 'done')?.tasks.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <ListTodo className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-100">
                    Minhas Tarefas
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Organize e acompanhe seu progresso
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-lg font-semibold text-slate-100">
                  {completedTasks}/{totalTasks}
                </div>
                <div className="text-xs text-slate-400">concluídas</div>
              </div>
              
              <div className="flex items-center gap-2 text-slate-400">
                <Moon className="w-5 h-5" />
                <span className="text-sm">Tema Dark</span>
              </div>
            </div>
          </div>

          {totalTasks > 0 && (
            <div className="mt-4">
              <div className="w-full bg-slate-700/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onDelete={deleteTask}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={addTask}
        onUpdate={updateTask}
        initialStatus={modalStatus}
        editTask={editingTask}
      />
    </div>
  );
}

export default App;