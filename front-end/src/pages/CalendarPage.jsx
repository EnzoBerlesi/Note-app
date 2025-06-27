import CalendarView from '../components/CalendarView'
import { useTasks } from '../hooks/useTasks'
import { Calendar as CalendarIcon, TrendingUp, Clock, CheckCircle } from 'lucide-react'

const CalendarPage = () => {
  const { tasks, loading, error } = useTasks()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium">Erro ao carregar calendário</h3>
            <div className="mt-2 text-sm">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const tasksWithDates = tasks.filter(task => task.dueDate)
  const overdueTasks = tasksWithDates.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== 'done'
  )
  const todayTasks = tasksWithDates.filter(task => {
    const today = new Date()
    const taskDate = new Date(task.dueDate)
    return taskDate.toDateString() === today.toDateString()
  })
  const upcomingTasks = tasksWithDates.filter(task => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const taskDate = new Date(task.dueDate)
    return taskDate > new Date() && taskDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-800 rounded-xl border border-gray-700">
          <CalendarIcon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Calendário
          </h1>
          <p className="text-gray-400">
            Visualize suas tarefas por data
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            icon: CalendarIcon, 
            color: 'blue', 
            title: 'Total com Datas', 
            value: tasksWithDates.length 
          },
          { 
            icon: Clock, 
            color: 'red', 
            title: 'Atrasadas', 
            value: overdueTasks.length 
          },
          { 
            icon: TrendingUp, 
            color: 'yellow', 
            title: 'Hoje', 
            value: todayTasks.length 
          },
          { 
            icon: CheckCircle, 
            color: 'green', 
            title: 'Próximos 7 dias', 
            value: upcomingTasks.length 
          }
        ].map((stat, index) => (
          <div 
            key={index} 
            className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-${stat.color}-500 transition-all`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerta */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
          <Clock className="flex-shrink-0 text-red-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-white">
              {overdueTasks.length} tarefa(s) atrasada(s)
            </h3>
            <ul className="mt-1 text-gray-300 text-sm">
              {overdueTasks.slice(0, 3).map(task => (
                <li key={task.id} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {task.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Calendário */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
        <CalendarView tasks={tasks} />
      </div>
    </div>
  )
}

export default CalendarPage