import { useState, useEffect } from 'react'
import { X, Save, Eye, Edit, Calendar, Flag, Tag, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: []
  })
  const [newTag, setNewTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        content: task.content || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        tags: task.tags || []
      })
    } else {
      setFormData({
        title: '',
        content: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        tags: []
      })
    }
  }, [task, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSave({
      ...formData,
      dueDate: formData.dueDate || null
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.name === 'newTag') {
      e.preventDefault()
      addTag()
    }
  }

  if (!isOpen) return null

  const statusOptions = [
    { value: 'todo', label: 'A Fazer', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
    { value: 'inprogress', label: 'Em Progresso', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
    { value: 'done', label: 'Concluído', color: 'text-green-600', bg: 'bg-green-50 border-green-200' }
  ]

  const priorityOptions = [
    { value: 'low', label: 'Baixa', color: 'text-green-600' },
    { value: 'medium', label: 'Média', color: 'text-yellow-600' },
    { value: 'high', label: 'Alta', color: 'text-red-600' }
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-gray-800 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {task ? 'Editar Tarefa' : 'Nova Tarefa'}
                </h2>
                <p className="text-sm text-gray-400">
                  {task ? 'Modifique os detalhes da sua tarefa' : 'Crie uma nova tarefa incrível'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Toggle Preview */}
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isPreview 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {isPreview ? <Edit size={16} /> : <Eye size={16} />}
                <span>{isPreview ? 'Editar' : 'Visualizar'}</span>
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Coluna Principal - Conteúdo */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Título */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Título da Tarefa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Ex: Implementar autenticação do usuário..."
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Descrição (Markdown)
                    </label>
                    
                    {isPreview ? (
                      <div className="w-full min-h-40 max-h-80 overflow-y-auto p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                        {formData.content ? (
                          <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
                            {formData.content}
                          </ReactMarkdown>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 italic text-center py-8">
                            Nada para visualizar ainda...
                          </p>
                        )}
                      </div>
                    ) : (
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        rows={10}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder={`Descreva sua tarefa usando Markdown...

## Exemplo:
- [ ] Configurar banco de dados
- [ ] Criar endpoints da API
- [x] Documentar funcionalidades

**Código:**
\`\`\`javascript
const task = { status: 'inprogress' }
\`\`\`

> **Nota:** Esta é uma tarefa importante!`}
                      />
                    )}
                  </div>
                </div>

                {/* Coluna Lateral - Metadados */}
                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Status
                    </label>
                    <div className="space-y-2">
                      {statusOptions.map(option => (
                        <label key={option.value} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value={option.value}
                            checked={formData.status === option.value}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                            className="sr-only"
                          />
                          <div className={`w-full p-3 rounded-lg border-2 transition-all ${
                            formData.status === option.value 
                              ? `${option.bg} border-current ${option.color}` 
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}>
                            <span className={`font-medium ${
                              formData.status === option.value 
                                ? option.color 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {option.label}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Prioridade */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <Flag className="inline w-4 h-4 mr-1" />
                      Prioridade
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {priorityOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Data de Vencimento */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Data de Vencimento
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <Tag className="inline w-4 h-4 mr-1" />
                      Tags
                    </label>
                    
                    {/* Input para nova tag */}
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        name="newTag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nova tag..."
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Tags existentes */}
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800"
                        >
                          <span>#{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save size={18} />
                  <span>{task ? 'Atualizar' : 'Criar'} Tarefa</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
