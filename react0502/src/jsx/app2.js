
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

var Todo = React.createClass({
  handleClick: function() {
    TodoStorage.complete(this.props.todo.id);
  },
  render: function() {
    var todo = this.props.todo;
    var doneButton = todo.done ? null : <button onClick={this.handleClick}>Done</button>;
    return (<li>{todo.name}{doneButton}</li>);
  }
});

var TodoForm = React.createClass({
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
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.name} onChange={this.handleNameChange}></input>
        <input type="submit" disabled={disabled}></input>
      </form>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var rows = this.props.todos.filter(function(todo) {
      return !todo.done;
    }).map(function(todo) {
      return (<Todo key={todo.id} todo={todo}></Todo>);
    });
    return (
      <div className="active-todos">
        <h2>Active</h2>
        <ul>{rows}</ul>
        <TodoForm/>
      </div>
    );
  }
});

var App = React.createClass({
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
      <div>
        <h1>My Todo</h1>
        <TodoList todos={this.state.todos}/>
      </div>
    );
  }
});

React.render(
  <App></App>,
  document.getElementById('app-container')
);