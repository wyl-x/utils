// 全局定时器调度器
class GlobalTimer {
  constructor(interval = 1000) {
    this.interval = interval // 定时器精度(毫秒)
    this.tasks = []
    this.timerId = null
  }

  // 添加定时任务
  // fn: 要执行的函数
  // delay: 间隔多久执行一次(毫秒)
  // repeat: 是否循环执行
  addTask(fn, delay, repeat = true) {
    const task = {
      fn,
      delay,
      repeat,
      lastRun: Date.now()
    }
    this.tasks.push(task)
    if (!this.timerId) this.start()
    return task
  }

  // 移除定时任务(例如: 组件销毁时调用)
  removeTask(fn) {
    this.tasks = this.tasks.filter((t) => t.fn !== fn)
    if (this.tasks.length === 0) this.stop()
  }

  // 重置定时任务
  restartTask(fn) {
    const task = this.tasks.find((t) => t.fn === fn)
    if (task) {
      task.lastRun = Date.now()
    }
  }

  // 启动全局定时器
  start() {
    if (this.timerId) return
    this.timerId = setInterval(() => this.runTasks(), this.interval)
  }

  // 停止定时器
  stop() {
    if (this.timerId) clearInterval(this.timerId)
    this.timerId = null
  }

  // 轮询执行任务
  runTasks() {
    const now = Date.now()
    this.tasks.forEach((task) => {
      if (now - task.lastRun >= task.delay - 100) {
        task.fn()
        task.lastRun = now
        // 如果不是循环任务，则移除
        if (!task.repeat) this.removeTask(task)
      }
    })
  }
}

// 使用示例
export default new GlobalTimer()
