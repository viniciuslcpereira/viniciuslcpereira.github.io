var config = {
    apiKey: "AIzaSyB9cgS_D16vMC1zwpsEWzUs_mdaypUFpMQ",
    authDomain: "portfolio-c8468.firebaseapp.com",
    databaseURL: "https://portfolio-c8468.firebaseio.com",
    storageBucket: "portfolio-c8468.appspot.com",
    messagingSenderId: "476269695676"
};

var files = {
    '/': {
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
    '/journal.txt': {
      type: 'file',
      modified: Date.now(),
      content: 'this is private!'
    },
    '/home': {
      type: 'dir',
      modified: Date.now()
    },
    '/projects': {
      type: 'dir',
      modified: Date.now()
    }
}

firebase.initializeApp(config);

var loaded_projects = {}
var my_projects = firebase.database().ref('/projetos');

my_projects.once('value', function(projects) {
    projects.forEach(function(project) {
        var values = project.val()
        loaded_projects[project.key] = {
            'type': 'file',
            'modified': Date.now(),
            'content': values.descricao
        }
    })
}).then(function() {
    for (project in loaded_projects) {
        files['/projects/' + project] = loaded_projects[project]
    }
})
