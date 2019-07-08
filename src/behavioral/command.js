/* global $ */
const Editor = { // caller
  stack: [],
  undos: [],

  call (command) {
    this.stack.push(command)
    command.execute()
    return this
  },

  undo () {
    const command = this.stack.pop()
    console.log(command)
    if (!command) return this
    this.undos.push(command)
    command.undo()
    return this
  },

  redo () {
    const command = this.undos.pop()
    if (!command) return this
    this.call(command)
    return this
  }
}

$(document).ready(() => {
  const person = {
    firstName: null,
    lastName: null,
    age: null
  }

  const createCommand = ({ target, old, value }) => ({
    execute () {
      person[target] = value
    },
    undo () {
      person[target] = old
    },
    info () {
      return { target, old, value }
    }
  })

  const eventHandler = (target) => {
    $(`#${target}Button`).on('click', function (event) {
      const command = createCommand({
        target: target,
        old: person[target],
        value: $(`#${target}Input`).val()
      })
      Editor.call(command)
      render()
      $(`#${target}Input`).val(null)
    })
  }

  const render = () => {
    $('#out').text(JSON.stringify(person, null, 2))
    const stack = $('#stack')
    const ul = $('<ul></ul>')
    Editor.stack.forEach(command => ul.append(`<li>${command.info().target}</li>`))
    stack.html(ul)
  }

  eventHandler('firstName')
  eventHandler('lastName')
  eventHandler('age')

  $('#undoButton').on('click', () => Editor.undo() && render())
  $('#redoButton').on('click', () => Editor.redo() && render())

  render()
})
