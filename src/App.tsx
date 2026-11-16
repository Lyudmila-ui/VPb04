import { useState } from 'react'

// Python код системы
const pythonCode = `from datetime import datetime, timedelta


class Task:
    """Класс, описывающий задачу."""

    _counter = 0

    def __init__(self, name_t: str, description_t: str = ""):
        Task._counter += 1
        self.id_t = Task._counter
        self.data_t = datetime.now().strftime("%Y-%m-%d %H:%M")
        self.name_t = name_t
        self.description_t = description_t
        self.is_done = False
        self.due_date = None

    def mark_as_done(self):
        """Пометить задачу как выполненную."""
        self.is_done = True
        print(f"✅ Задача '{self.name_t}' выполнена!")

    def set_due_date(self, dt: str):
        """Установить срок выполнения задачи."""
        self.due_date = dt
        print(f"📅 Срок для '{self.name_t}' установлен: {dt}")

    def change_description(self, new_text: str):
        """Изменить описание задачи."""
        self.description_t = new_text
        print(f"📝 Описание '{self.name_t}' обновлено.")

    def __str__(self):
        status = "✅" if self.is_done else "⬜"
        due = f" | Срок: {self.due_date}" if self.due_date else ""
        return f"{status} [{self.id_t}] {self.name_t}{due}"


class Project:
    """Проект, в котором создаются задачи."""

    _counter = 0

    def __init__(self, name_p: str, description_p: str, owner: str):
        Project._counter += 1
        self.id_p = Project._counter
        self.name_p = name_p
        self.description_p = description_p
        self.owner = owner
        self.tasks = []

    def add_task(self, task: Task):
        """Добавить задачу в проект."""
        self.tasks.append(task)
        print(f"📌 Задача '{task.name_t}' добавлена в проект '{self.name_p}'")

    def remove_task(self, task_id: int):
        """Удалить задачу из проекта по ID."""
        self.tasks = [t for t in self.tasks if t.id_t != task_id]
        print(f"🗑️ Задача #{task_id} удалена из проекта '{self.name_p}'")

    def __str__(self):
        return f"📁 Проект '{self.name_p}' (владелец: {self.owner}) — задач: {len(self.tasks)}"


class User:
    """Пользователь системы."""

    _counter = 0

    def __init__(self, name_u: str, email: str, password: str):
        User._counter += 1
        self.id_u = User._counter
        self.name_u = name_u
        self.email = email
        self.password = password
        self.projects = []

    def create_project(self, name: str, description: str = "") -> Project:
        """Создать новый проект."""
        project = Project(name, description, self.name_u)
        self.projects.append(project)
        print(f"🚀 Пользователь '{self.name_u}' создал проект '{name}'")
        return project

    def delete_project(self, project_id: int):
        """Удалить проект по ID."""
        self.projects = [p for p in self.projects if p.id_p != project_id]
        print(f"❌ Проект #{project_id} удалён пользователем '{self.name_u}'")

    def get_all_tasks(self):
        """Показать все задачи из всех проектов."""
        print(f"\\n📋 Все задачи пользователя '{self.name_u}':")
        print("-" * 40)
        for project in self.projects:
            print(f"  {project}")
            for task in project.tasks:
                print(f"    {task}")
        print("-" * 40)


# ============================================
# Пример использования системы
# ============================================

if __name__ == "__main__":
    # Создаём пользователя
    user = User("Иванов Иван Иванович", "ivanov@mail.ru", "password123")
    print(f"👤 Создан пользователь: {user.name_u} ({user.email})\\n")

    # Создаём проект
    project = user.create_project("Разработка сайта", "Создание корпоративного сайта")

    # Создаём задачи
    task1 = Task("Дизайн главной страницы", "Создать макет в Figma")
    task2 = Task("Вёрстка", "HTML + CSS адаптивная вёрстка")
    task3 = Task("Backend", "REST API на Django")

    # Устанавливаем сроки
    task1.set_due_date("2025-02-01")
    task2.set_due_date("2025-02-15")
    task3.set_due_date("2025-03-01")

    # Добавляем задачи в проект
    project.add_task(task1)
    project.add_task(task2)
    project.add_task(task3)

    # Выполняем первую задачу
    task1.mark_as_done()

    # Изменяем описание
    task2.change_description("Адаптивная вёрстка с мобильной версией")

    # Показываем все задачи
    user.get_all_tasks()

    # Удаляем задачу
    project.remove_task(3)
    print()
    user.get_all_tasks()`

// Типы для демонстрации
interface TaskData {
  id: number
  name: string
  description: string
  isDone: boolean
  dueDate: string | null
  createdAt: string
}

interface ProjectData {
  id: number
  name: string
  description: string
  owner: string
  tasks: TaskData[]
}

interface UserData {
  id: number
  name: string
  email: string
  projects: ProjectData[]
}

// Симуляция Python системы на TypeScript
class TaskSim {
  static counter = 0
  id: number
  name: string
  description: string
  isDone: boolean
  dueDate: string | null
  createdAt: string

  constructor(name: string, description = '') {
    TaskSim.counter++
    this.id = TaskSim.counter
    this.name = name
    this.description = description
    this.isDone = false
    this.dueDate = null
    this.createdAt = new Date().toLocaleString('ru-RU')
  }

  markAsDone() {
    this.isDone = true
  }

  setDueDate(dt: string) {
    this.dueDate = dt
  }

  changeDescription(newText: string) {
    this.description = newText
  }

  toData(): TaskData {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      isDone: this.isDone,
      dueDate: this.dueDate,
      createdAt: this.createdAt,
    }
  }
}

class ProjectSim {
  static counter = 0
  id: number
  name: string
  description: string
  owner: string
  tasks: TaskSim[]

  constructor(name: string, description: string, owner: string) {
    ProjectSim.counter++
    this.id = ProjectSim.counter
    this.name = name
    this.description = description
    this.owner = owner
    this.tasks = []
  }

  addTask(task: TaskSim) {
    this.tasks.push(task)
  }

  removeTask(taskId: number) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId)
  }

  toData(): ProjectData {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      owner: this.owner,
      tasks: this.tasks.map((t) => t.toData()),
    }
  }
}

class UserSim {
  static counter = 0
  id: number
  name: string
  email: string
  projects: ProjectSim[]

  constructor(name: string, email: string) {
    UserSim.counter++
    this.id = UserSim.counter
    this.name = name
    this.email = email
    this.projects = []
  }

  createProject(name: string, description = ''): ProjectSim {
    const project = new ProjectSim(name, description, this.name)
    this.projects.push(project)
    return project
  }

  deleteProject(projectId: number) {
    this.projects = this.projects.filter((p) => p.id !== projectId)
  }

  getAllTasks(): TaskData[] {
    return this.projects.flatMap((p) => p.tasks.map((t) => t.toData()))
  }

  toData(): UserData {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      projects: this.projects.map((p) => p.toData()),
    }
  }
}

type Tab = 'code' | 'diagram' | 'demo'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('code')
  const [user, setUser] = useState<UserData | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `> ${msg}`])
  }

  const runDemo = () => {
    TaskSim.counter = 0
    ProjectSim.counter = 0
    UserSim.counter = 0
    setLogs([])

    addLog('Создание пользователя...')
    const userSim = new UserSim('Иванов Иван Иванович', 'ivanov@mail.ru')
    addLog(`👤 Создан: ${userSim.name} (${userSim.email})`)

    addLog('\nСоздание проекта...')
    const project = userSim.createProject('Разработка сайта', 'Создание корпоративного сайта')
    addLog(`🚀 Проект создан: "${project.name}"`)

    addLog('\nСоздание задач...')
    const task1 = new TaskSim('Дизайн главной страницы', 'Создать макет в Figma')
    const task2 = new TaskSim('Вёрстка', 'HTML + CSS адаптивная вёрстка')
    const task3 = new TaskSim('Backend', 'REST API на Django')
    addLog(`📌 Задача #${task1.id}: ${task1.name}`)
    addLog(`📌 Задача #${task2.id}: ${task2.name}`)
    addLog(`📌 Задача #${task3.id}: ${task3.name}`)

    addLog('\nУстановка сроков...')
    task1.setDueDate('2025-02-01')
    task2.setDueDate('2025-02-15')
    task3.setDueDate('2025-03-01')
    addLog(`📅 ${task1.name} → ${task1.dueDate}`)
    addLog(`📅 ${task2.name} → ${task2.dueDate}`)
    addLog(`📅 ${task3.name} → ${task3.dueDate}`)

    addLog('\nДобавление задач в проект...')
    project.addTask(task1)
    project.addTask(task2)
    project.addTask(task3)
    addLog(`✅ Все задачи добавлены в "${project.name}"`)

    addLog('\nВыполнение задачи...')
    task1.markAsDone()
    addLog(`✅ "${task1.name}" — выполнена!`)

    addLog('\nИзменение описания...')
    task2.changeDescription('Адаптивная вёрстка с мобильной версией')
    addLog(`📝 Описание "${task2.name}" обновлено`)

    addLog('\nУдаление задачи...')
    project.removeTask(3)
    addLog(`🗑️ Задача #3 удалена из проекта`)

    setUser(userSim.toData())
    addLog('\n📋 Итоговое состояние системы обновлено!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🐍 Система управления задачами
          </h1>
          <p className="mt-2 text-slate-300 text-lg">
            Объектно-ориентированное программирование на Python
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'code' as Tab, label: '📄 Код Python', icon: 'code' },
            { id: 'diagram' as Tab, label: '🏗️ Диаграмма классов', icon: 'diagram' },
            { id: 'demo' as Tab, label: '▶️ Демо', icon: 'demo' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Code Tab */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-700/50 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-3 text-sm text-slate-400 font-mono">task_system.py</span>
              </div>
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
                <code className="text-slate-200 font-mono whitespace-pre">{pythonCode}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Diagram Tab */}
        {activeTab === 'diagram' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task Class */}
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl border border-blue-500/30 p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span> Task
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-2">
                    Атрибуты
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">id_t — номер</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">data_t — дата создания</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">name_t — название</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">description_t — описание</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">is_done — выполнена</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">due_date — срок</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-2">
                    Методы
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">mark_as_done()</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">set_due_date(dt)</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">change_description(new_text)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Project Class */}
            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl border border-green-500/30 p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">📁</span> Project
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-300 uppercase tracking-wider mb-2">
                    Атрибуты
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">id_p — номер</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">name_p — название</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">description_p — описание</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">owner — создатель</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-green-300 uppercase tracking-wider mb-2">
                    Методы
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">add_task(task)</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">remove_task(task_id)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Class */}
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl border border-purple-500/30 p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">👤</span> User
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-2">
                    Атрибуты
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">id_u — номер</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">name_u — ФИО</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">email — почта</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">password — пароль</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-2">
                    Методы
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">create_project(name)</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">delete_project(project_id)</li>
                    <li className="font-mono bg-slate-800/50 px-2 py-1 rounded">get_all_tasks()</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Relationships */}
            <div className="lg:col-span-3 bg-slate-800/50 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">🔗 Связи между классами</h3>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-2 text-blue-300 font-mono text-sm">
                  User
                </div>
                <div className="text-slate-400">— создаёт —→</div>
                <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-2 text-green-300 font-mono text-sm">
                  Project
                </div>
                <div className="text-slate-400">— содержит —→</div>
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-2 text-blue-300 font-mono text-sm">
                  Task
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-slate-400">
                User 1 ←→ * Project 1 ←→ * Task
              </div>
            </div>
          </div>
        )}

        {/* Demo Tab */}
        {activeTab === 'demo' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={runDemo}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-bold text-white shadow-lg shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-200 hover:scale-105"
              >
                ▶️ Запустить демонстрацию
              </button>
              <button
                onClick={() => {
                  setUser(null)
                  setLogs([])
                  TaskSim.counter = 0
                  ProjectSim.counter = 0
                  UserSim.counter = 0
                }}
                className="px-6 py-3 bg-slate-700 rounded-lg font-medium text-slate-300 hover:bg-slate-600 transition-all"
              >
                🔄 Сбросить
              </button>
            </div>

            {/* Logs */}
            {logs.length > 0 && (
              <div className="bg-slate-800/80 rounded-xl border border-white/10 overflow-hidden">
                <div className="px-4 py-3 bg-slate-700/50 border-b border-white/10">
                  <span className="text-sm text-slate-400 font-mono">Консоль вывода</span>
                </div>
                <div className="p-4 max-h-64 overflow-y-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="font-mono text-sm text-green-300 py-0.5">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* State visualization */}
            {user && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  👤 Состояние системы
                </h3>

                <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-xl border border-purple-500/30 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-lg">
                      👤
                    </div>
                    <div>
                      <div className="font-bold text-purple-300">{user.name}</div>
                      <div className="text-sm text-slate-400">{user.email}</div>
                    </div>
                    <span className="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded">
                      id_u = {user.id}
                    </span>
                  </div>

                  {user.projects.map((project) => (
                    <div
                      key={project.id}
                      className="mt-4 bg-slate-800/50 rounded-lg border border-green-500/20 p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">📁</span>
                        <span className="font-bold text-green-300">{project.name}</span>
                        <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded">
                          id_p = {project.id}
                        </span>
                        <span className="text-xs text-slate-400 ml-auto">
                          Владелец: {project.owner}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{project.description}</p>

                      <div className="space-y-2">
                        {project.tasks.length === 0 ? (
                          <p className="text-sm text-slate-500 italic">Нет задач</p>
                        ) : (
                          project.tasks.map((task) => (
                            <div
                              key={task.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border ${
                                task.isDone
                                  ? 'bg-green-900/20 border-green-500/30'
                                  : 'bg-slate-700/30 border-white/10'
                              }`}
                            >
                              <span className="text-lg">{task.isDone ? '✅' : '⬜'}</span>
                              <div className="flex-1">
                                <div
                                  className={`font-medium ${task.isDone ? 'text-green-300 line-through' : 'text-white'}`}
                                >
                                  {task.name}
                                </div>
                                <div className="text-xs text-slate-400">{task.description}</div>
                                {task.dueDate && (
                                  <div className="text-xs text-yellow-400 mt-1">
                                    📅 Срок: {task.dueDate}
                                  </div>
                                )}
                              </div>
                              <span className="text-xs bg-blue-600/30 text-blue-300 px-2 py-1 rounded">
                                #{task.id}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          Система управления задачами • Python ООП • Task • Project • User
        </div>
      </footer>
    </div>
  )
}

export default App
