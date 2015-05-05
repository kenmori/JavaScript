
var generateId = (function() {
  var id = 0;
  return function() {
    return '_' + id++;
  }
})();

var todos = [{
  id: generateId(),
  name: 'Buy some milk'
}, {
  id: generateId(),
  name: 'Birthday present to Alice'
}];

var TodoStorage = {
  on: function(_, _callback) {//TODO use EventEmitter
    this._onChangeCallback = _callback;
  },
  getAll: function(callback) {
    callback(todos);
  },
  complete: function(id) {
    for(var i = 0; i < todos.length; i++) {
      var todo = todos[i];
      if(todo.id === id) {
        var newTodo = React.addons.update(todo, {done: {$set: true}});
        todos = React.addons.update(todos, {$splice: [[i, 1, newTodo]]});
        this._onChangeCallback();
        break;
      }
    }
  },
  create: function(name, callback) {
    var newTodo = {
      id: generateId(),
      name: name
    };
    todos = React.addons.update(todos, {$push: [newTodo]});
    this._onChangeCallback();
    callback();
  }
};

var Todo = React.createClass({displayName: "Todo",
  handleClick: function() {
    TodoStorage.complete(this.props.todo.id);
  },
  render: function() {
    var todo = this.props.todo;
    var doneButton = todo.done ? null : React.createElement("button", {onClick: this.handleClick}, "Done");
    return (React.createElement("li", null, todo.name, doneButton));
  }
});

var TodoForm = React.createClass({displayName: "TodoForm",
  getInitialState: function() {
    return {
      name: '' 
    };
  },
  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    TodoStorage.create(name, function() {
      this.setState({
        name: ''
      });
    }.bind(this));
  },
  render: function() {
    var disabled = this.state.name.trim().length <= 0;
    return (
      React.createElement("form", {onSubmit: this.handleSubmit}, 
        React.createElement("input", {value: this.state.name, onChange: this.handleNameChange}), 
        React.createElement("input", {type: "submit", disabled: disabled})
      )
    );
  }
});

var TodoList = React.createClass({displayName: "TodoList",
  render: function() {
    var rows = this.props.todos.filter(function(todo) {
      return !todo.done;
    }).map(function(todo) {
      return (React.createElement(Todo, {key: todo.id, todo: todo}));
    });
    return (
      React.createElement("div", {className: "active-todos"}, 
        React.createElement("h2", null, "Active"), 
        React.createElement("ul", null, rows), 
        React.createElement(TodoForm, null)
      )
    );
  }
});

var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {
      todos: []
    };
  },
  componentDidMount: function() {
    var setState = function() {
      TodoStorage.getAll(function(todos) {
        this.setState({
          todos: todos
        });
      }.bind(this));
    }.bind(this);
    TodoStorage.on('change', setState);
    setState();
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "My Todo"), 
        React.createElement(TodoList, {todos: this.state.todos})
      )
    );
  }
});

React.render(
  React.createElement(App, null),
  document.getElementById('app-container')
);