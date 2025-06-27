import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Edit2, Trash2, Clock, Flag, Calendar, User, AlertTriangle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const TaskCard = ({ task, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          color: 'text-red-500',
          bg: 'bg-red-100 dark:bg-red-900/30',
          label: 'Alta',
          icon: AlertTriangle
        }
      case 'medium':
        return {
          color: 'text-yellow-500',
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          label: 'Média',
          icon: Flag
        }
      case 'low':
        return {
          color: 'text-green-500',
          bg: 'bg-green-100 dark:bg-green-900/30',
          label: 'Baixa',
          icon: Flag
        }
      default:
        return {
          color: 'text-gray-500',
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          label: 'Normal',
          icon: Flag
        }
    }
  }

  const priorityConfig = getPriorityConfig(task.priority)
  const PriorityIcon = priorityConfig.icon
  
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()
  const isDueToday = task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')

   return (
    <div className="group relative bg-gray-800 rounded-2xl border border-gray-700 
      transition-all duration-300 hover:-translate-y-1 hover:shadow-hard
      shadow-[0_2px_8px_-1px_rgba(0,0,0,0.15)]
      overflow-hidden">
      
      {/* Gradiente de status */}
      <div className={`absolute top-0 left-0 w-full h-1 ${getStatusGradient(task.status)}`} />
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox interativo */}
          <div className="mt-1 flex-shrink-0">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
              ${task.status === 'done' 
                ? 'bg-success-500 border-success-500 text-white' 
                : 'border-surface-300 dark:border-surface-600 group-hover:border-primary-500'}`}>
              {task.status === 'done' && <Check size={14} />}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium leading-snug line-clamp-2">
              {task.title}
            </h3>
            
            {/* Metadados */}
            <div className="mt-2 flex flex-wrap gap-2">
              {task.dueDate && (
                <div className={`flex items-center text-xs px-2 py-1 rounded-full 
                  ${isOverdue(task.dueDate) 
                    ? 'bg-danger-50 dark:bg-danger-900/20 text-danger-600 dark:text-danger-300' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'}`}>
                  <Calendar size={12} className="mr-1" />
                  {formatDate(task.dueDate)}
                </div>
              )}
              
              {task.priority && (
                <div className={`flex items-center text-xs px-2 py-1 rounded-full 
                  ${getPriorityBadgeStyle(task.priority)}`}>
                  <Flag size={12} className="mr-1" />
                  {task.priority}
                </div>
              )}
            </div>
          </div>
          
          {/* Menu de ações (aparece no hover) */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
              <Edit3 size={16} />
            </button>
            <button className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
