// src/pages/Home.jsx
import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import TaskBoard from '../components/TaskBoard'
import TaskModal from '../components/TaskModal'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const { tasks, addTask, deleteTask } = useTasks()
  const [search, setSearch] = useState('')
  const [tagsFilter, setTagsFilter] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const allTags = [...new Set(tasks.flatMap(t => t.tags || []))]

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
    const matchesTags = tagsFilter.every(tag => task.tags?.includes(tag))
    return matchesSearch && matchesTags
  })

  const handleSave = (task) => {
    if (editingTask) {
      deleteTask(editingTask.id)
    }
    addTask(task)
    setModalOpen(false)
    setEditingTask(null)
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    deleteTask(id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6 space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Minhas Tarefas</h1>
          <p className="text-gray-400">Organize e visualize suas tarefas com facilidade</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          + Nova Tarefa
        </button>
      </header>

      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 shadow-xl">
        <SearchBar
          value={search}
          onChange={setSearch}
          selectedTags={tagsFilter}
          onTagsChange={setTagsFilter}
          allTags={allTags}
        />
      </div>

      <div className="rounded-2xl border border-gray-700/40 backdrop-blur-lg shadow-2xl">
        <TaskBoard
          tasks={filteredTasks}
          onEditTask={handleEdit}
          onDeleteTask={handleDelete}
        />
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingTask(null)
        }}
        onSave={handleSave}
        task={editingTask}
      />
    </div>
  )
}
