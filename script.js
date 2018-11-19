class ToDo {
    constructor() {
        this.tasks = []

        this.render()
    }

    addTask(text) {
        this.tasks.push(new Task(text))
        this.render()
    }

    render() {
        document.body.innerHTML = ''

        const ul = document.createElement('ul')

        this.makeUI()

        this.tasks.forEach((task, index) => {
            const li = document.createElement('li')
            const button = document.createElement('button')

            li.innerText = task.text
            button.innerText = 'Usuń'

            button.addEventListener('click', (e) => this.deleteClickHandler(e, index))

            li.addEventListener('click', function () {
                if (this.style.textDecoration == 'line-through') {
                    this.style.textDecoration = 'none'
                } else {
                    this.style.textDecoration = 'line-through'
                }
            })
            li.appendChild(button)
            ul.appendChild(li)
            document.body.appendChild(ul)
        })
    }

    makeUI() {
        const input = document.createElement('input')
        const addButton = document.createElement('button')
        addButton.innerText = 'Dodaj zadanie'

        addButton.addEventListener(
            'click',
            () => this.addTask(input.value)
        )

        document.body.appendChild(input)
        document.body.appendChild(addButton)
    }

    deleteClickHandler(e, index) {
        e.stopPropagation()
        this.tasks = this.tasks.slice(0, index).concat(this.tasks.slice(index + 1))
        this.render()
    }

}

class Task {
    constructor(text) {
        this.text = text
    }
}

const toDo1 = new ToDo()
/* komentarz sprawdzający*/