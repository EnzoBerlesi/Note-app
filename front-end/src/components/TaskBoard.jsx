import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import TaskCard from './TaskCard'
import { Plus, Circle, Clock, CheckCircle2 } from 'lucide-react'

const TaskColumn = ({ id, title, tasks, onEditTask, onDeleteTask, color, icon: Icon }) => {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-h-96 transition-all duration-300 ${
        isOver 
          ? 'scale-105 shadow-2xl' 
          : 'hover:shadow-lg'
      }`}
    >
      {/* Header da Coluna */}
      <div className={`p-4 rounded-t-xl border-t-4 ${color} bg-gray-800 border-x border-gray-700`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color.replace('border-t-4', 'bg').replace('border-', 'bg-')}`}>
              <Icon size={16} className="text-white" />
            </div>
            <h3 className="font-semibold text-lg text-white">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              color.includes('red') 
                ? 'bg-red-900/30 text-red-300'
                : color.includes('yellow')
                ? 'bg-yellow-900/30 text-yellow-300'
                : 'bg-green-900/30 text-green-300'
            }`}>
              {tasks.length}
            </span>
          </div>
        </div>
        
        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${color.replace('border-t-4', 'bg').replace('border-', 'bg-')}`}
            style={{ width: tasks.length > 0 ? `${Math.min((tasks.length / 10) * 100, 100)}%` : '0%' }}
          />
        </div>
      </div>

      {/* Área de Drop */}
      <div className={`min-h-80 p-4 bg-gray-800/50 border-x border-b border-gray-700 rounded-b-xl transition-all duration-300 ${
        isOver 
          ? 'bg-blue-900/20 border-blue-600' 
          : ''
      }`}>
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            
            {/* Estado vazio */}
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  color.includes('red') 
                    ? 'bg-red-900/30'
                    : color.includes('yellow')
                    ? 'bg-yellow-900/30'
                    : 'bg-green-900/30'
                }`}>
                  <Icon size={24} className={`${
                    color.includes('red') 
                      ? 'text-red-400'
                      : color.includes('yellow')
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`} />
                </div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Nenhuma tarefa {title.toLowerCase()}
                </p>
                <p className="text-xs text-gray-500">
                  Arraste tarefas para cá ou crie uma nova
                </p>
              </div>
            )}
          </div>
        </SortableContext>

        {/* Indicador de Drop */}
        {isOver && (
          <div className="mt-4 p-3 border-2 border-dashed border-blue-400 rounded-lg bg-blue-900/20">
            <p className="text-sm text-blue-400 text-center font-medium">
              Solte aqui para mover para "{title}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const TaskBoard = ({ tasks, onEditTask, onDeleteTask }) => {
  const todoTasks = tasks.filter(task => task.status === 'todo')
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress')
  const doneTasks = tasks.filter(task => task.status === 'done')

  const columns = [
    {
      id: 'todo',
      title: 'A Fazer',
      tasks: todoTasks,
      color: 'border-t-red-500',
      icon: Circle
    },
    {
      id: 'inprogress',
      title: 'Em Progresso',
      tasks: inProgressTasks,
      color: 'border-t-yellow-500',
      icon: Clock
    },
    {
      id: 'done',
      title: 'Concluído',
      tasks: doneTasks,
      color: 'border-t-green-500',
      icon: CheckCircle2
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {columns.map(column => (
        <div key={column.id} className="bg-gray-800/80 backdrop-blur-lg 
          rounded-3xl border border-gray-700/50
          shadow-soft overflow-hidden">
          
          {/* Header da coluna */}
          <div className={`p-4 border-b border-gray-700/50 
            ${column.id === 'todo' ? 'bg-red-900/10' : 
              column.id === 'inprogress' ? 'bg-yellow-900/10' : 
              'bg-green-900/10'}`}>
            
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2 text-white">
                <column.icon size={18} className={column.id === 'todo' ? 'text-red-500' : 
                  column.id === 'inprogress' ? 'text-yellow-500' : 'text-green-500'} />
                {column.title}
              </h3>
              <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                {column.tasks.length}
              </span>
            </div>
          </div>
          
          {/* Área de tasks */}
          <div className="p-4 space-y-4 min-h-[300px]">
            {column.tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            
            {column.tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-12 h-12 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center mb-3">
                  <column.icon size={24} className="text-surface-400" />
                </div>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  Nenhuma tarefa aqui
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskBoard
