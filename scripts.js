var input = document.getElementById('input')
      var output = document.getElementById('output')

      var emulator = bashEmulator({
        workingDirectory: '/home/vinicius',
        fileSystem: {
          '/home/vinicius': {
            type: 'dir',
            modified: Date.now()
          },
          '/README.txt': {
            type: 'file',
            modified: Date.now(),
            content: 'empty'
          },
          '/home': {
            type: 'dir',
            modified: Date.now()
          },
          '/home/vinicius/journal.txt': {
            type: 'file',
            modified: Date.now(),
            content: 'this is private!'
          },
          '/home/vinicius': {
            type: 'dir',
            modified: Date.now()
          }
        }
      })

      var ENTER = 13
      var UP = 38
      var DOWN = 40

      function log (result) {
        output.innerHTML += (result || '') + '\n'
      }

      function error (result) {
        log('<div class="error">' + result + '</div>')
      }

      function run (cmd) {
        log('$ ' + cmd)
        return emulator.run(cmd).then(log, error)
      }

      var completeFunctions = {}
      completeFunctions[UP] = emulator.completeUp
      completeFunctions[DOWN] = emulator.completeDown

      function complete (direction) {
        var completeFunction = completeFunctions[direction]
        if (!completeFunction) {
          return
        }
        var cursorPosition = input.selectionStart
        var beforeCursor = input.value.slice(0, cursorPosition)
        completeFunction(beforeCursor).then(function (completion) {
          if (completion) {
            input.value = completion
            input.setSelectionRange(cursorPosition, cursorPosition)
          }
        })
      }

      input.addEventListener('keydown', function (e) {
        if (e.altKey || e.metaKey || e.shiftKey || e.ctrlKey) {
          return
        }
        if (e.which === UP || e.which === DOWN) {
          e.preventDefault()
          complete(e.which)
        }
      })

      input.addEventListener('keyup', function (e) {
        if (e.which !== ENTER) {
          return
        }
        if (!input.value.length) {
          return
        }
        run(input.value).then(function () {
          input.value = ''
          document.body.scrollTop = 10e6
        })
      })

      document.body.addEventListener('click', function () {
        input.focus()
      })

      run('pwd').then(function () {
        run('ls')
      })