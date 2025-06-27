import React, { useState, useEffect } from 'react';
import { X, Calendar, FileText, Type } from 'lucide-react';

export const AddTaskModal = ({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  initialStatus,
  editTask = null
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Preencher os campos quando estiver editando
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || '');
      setDescription(editTask.description || '');
      setDueDate(editTask.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [editTask, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editTask) {
      // Editando tarefa existente
      onUpdate(editTask.id, {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || new Date().toISOString().split('T')[0],
      });
    } else {
      // Criando nova tarefa
      onAdd({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || new Date().toISOString().split('T')[0],
        status: initialStatus
      });
    }

    setTitle('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-100">
            {editTask ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Type className="w-4 h-4" />
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg 
                       text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Digite o título da tarefa..."
              autoFocus
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <FileText className="w-4 h-4" />
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg 
                       text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Adicione uma descrição (opcional)..."
              rows={3}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Calendar className="w-4 h-4" />
              Data de Entrega
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg 
                       text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 text-slate-300 rounded-lg 
                       hover:bg-slate-600 transition-all font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-500 disabled:bg-slate-600 disabled:text-slate-400 
                       disabled:cursor-not-allowed transition-all font-medium"
            >
              {editTask ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};