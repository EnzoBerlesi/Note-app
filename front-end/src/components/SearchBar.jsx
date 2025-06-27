import { useState } from 'react'
import { Search, X, Filter, Sparkles } from 'lucide-react'

const SearchBar = ({ value, onChange, selectedTags, onTagsChange, allTags }) => {
  const [showFilters, setShowFilters] = useState(false)

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    onChange('')
    onTagsChange([])
  }

  const hasActiveFilters = value || selectedTags.length > 0

  return (
    <div className="relative">
      {/* Barra de Busca */}
      <div className="flex items-center gap-2">
        <div className="relative group">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" 
          />
          <input
            type="text"
            placeholder="Buscar tarefas..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-11 pr-4 py-2.5 w-64 rounded-xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
          />
          
          {/* Indicador de busca ativa */}
          {value && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button
                onClick={() => onChange('')}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Botão de Filtros */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`relative p-2.5 rounded-xl transition-all shadow-sm hover:shadow-md ${
            showFilters || selectedTags.length > 0
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600'
          }`}
          title="Filtros avançados"
        >
          <Filter size={18} />
          {selectedTags.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {selectedTags.length}
            </span>
          )}
        </button>

        {/* Botão Limpar Filtros */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-600 transition-all shadow-sm hover:shadow-md"
            title="Limpar todos os filtros"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Painel de Filtros */}
      {showFilters && (
        <div className="absolute top-full left-0 mt-2 p-6 rounded-xl border border-gray-600 shadow-2xl z-20 w-96 bg-gray-800 backdrop-blur-sm">
          {/* Header do Painel */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-white">
                Filtros Avançados
              </h4>
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Filtros por Tags */}
          <div className="mb-4">
            <h5 className="font-medium mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Filter size={16} />
              Filtrar por Tags
            </h5>
            
            {allTags.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {allTags.map((tag, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      #{tag}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {/* Aqui poderia mostrar quantas tarefas têm essa tag */}
                      ∞
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <Filter className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Nenhuma tag encontrada
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Crie tarefas com tags para filtrar
                </p>
              </div>
            )}
          </div>

          {/* Ações do Painel */}
          {selectedTags.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedTags.length} tag(s) selecionada(s)
                </p>
                <button
                  onClick={() => onTagsChange([])}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Limpar seleção
                </button>
              </div>
              
              {/* Tags selecionadas */}
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800"
                  >
                    #{tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
