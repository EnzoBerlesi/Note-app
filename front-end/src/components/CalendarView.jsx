import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfWeek, endOfWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Dot } from 'lucide-react'

const CalendarView = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      return isSameDay(new Date(task.dueDate), date)
    })
  }

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-red-500'
      case 'inprogress':
        return 'bg-yellow-500'
      case 'done':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusColorRing = (status) => {
    switch (status) {
      case 'todo':
        return 'ring-red-500/20'
      case 'inprogress':
        return 'ring-yellow-500/20'
      case 'done':
        return 'ring-green-500/20'
      default:
        return 'ring-gray-500/20'
    }
  }

 return (
    <div className="bg-surface-0 dark:bg-surface-900 rounded-3xl overflow-hidden shadow-hard">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {format(currentDate, 'MMMM yyyy', { locale })}
          </h2>
          <div className="flex gap-2">
            <button onClick={goToPreviousMonth} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
              <ChevronLeft size={20} />
            </button>
            <button onClick={goToToday} className="px-3 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white">
              Hoje
            </button>
            <button onClick={goToNextMonth} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Dias da semana */}
        <div className="grid grid-cols-7 mt-6">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-surface-500 dark:text-surface-400 py-2">
              {day}
            </div>
          ))}
        </div>
      </div>
      
      {/* Grid de dias */}
      <div className="grid grid-cols-7 p-6 pt-0">
        {calendarDays.map(day => {
          const dayTasks = getTasksForDate(day)
          
          return (
            <div key={day.toString()} className={`min-h-[120px] p-2 border-t border-surface-100 dark:border-surface-800
              ${isToday(day) ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}
              ${!isSameMonth(day, currentDate) ? 'opacity-40' : ''}`}>
              
              <div className={`flex items-center justify-center w-8 h-8 mx-auto rounded-full
                ${isToday(day) ? 'bg-primary-500 text-white' : 'text-surface-900 dark:text-surface-100'}`}>
                {format(day, 'd')}
              </div>
              
              {/* Mini indicadores de tarefas */}
              <div className="mt-1 space-y-1">
                {dayTasks.slice(0, 2).map(task => (
                  <div key={task.id} className={`h-1.5 rounded-full ${getStatusColor(task.status)}`} />
                ))}
                {dayTasks.length > 2 && (
                  <div className="h-1.5 rounded-full bg-surface-200 dark:bg-surface-700" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarView
