(function () {
class ToDo {
    constructor(appendLocation) {
        this.tasks = JSON.parse(localStorage.getItem('toDoList')) || []
        this.appendLocation = appendLocation || document.body
        this.render()
    }

    addTask(text) {
        this.tasks.push(new Task(text))
        this.updateTasksInLocalStorage()
        this.render()
    }

    render(tasks) {
        const array = tasks || this.tasks
        this.appendLocation.innerHTML = ''

        const ul = document.createElement('ul')

        this.makeUI()

        array.forEach((task, index) => {
            const li = document.createElement('li')
            const buttonDelete = document.createElement('button')
            buttonDelete.innerText = 'Delete task'

            buttonDelete.addEventListener('click', () => this.deleteTask(index))
            li.addEventListener('click', () => this.toggleTask(task))
            this.taskIsCompletedStyle(task, li)

            li.innerText = task.text
            li.appendChild(buttonDelete)
            ul.appendChild(li)
        })
        this.appendLocation.appendChild(ul)
    }


    makeUI() {
        const input = document.createElement('input')
        const input2 = document.createElement('input')
        const addButton = document.createElement('button')
        const filterButton = document.createElement('button')
        addButton.innerText = 'Dodaj zadanie'
        filterButton.innerText = 'Filter Tasks'

        addButton.addEventListener(
            'click',
            () => this.addTask(input.value)
        )

        filterButton.addEventListener(
            'click',
            () => { this.filterTasks(input2) }
        )


        this.appendLocation.appendChild(input)
        this.appendLocation.appendChild(addButton)
        this.appendLocation.appendChild(input2)
        this.appendLocation.appendChild(filterButton)
    }

    deleteTask(index) {
        this.tasks = this.tasks.slice(0, index).concat(this.tasks.slice(index + 1))
        this.updateTasksInLocalStorage()
        this.render()
    }
    toggleTask(task) {
        if (task.isCompleted === true) {
            task.isCompleted = false
        } else {
            task.isCompleted = true
        }
        this.render()
    }

    taskIsCompletedStyle(task, li) {
        if (task.isCompleted === false) {
            li.style.textDecoration = 'none'
        } else {
            li.style.textDecoration = 'line-through'
        }
    }


    updateTasksInLocalStorage() {
        localStorage.setItem('toDoList', `${JSON.stringify(this.tasks)}`)
    }

    filterTasks(input2) {
        const filteredArray = this.tasks.filter((element) => element.text === input2.value)
        this.tasks = []
        this.updateTasksInLocalStorage()
        this.render(filteredArray)
    }
}
class Task {
    constructor(text) {
        this.text = text
        this.isCompleted = false
    }
}

window.ToDo = ToDo
})()
toDo1 = new ToDo()