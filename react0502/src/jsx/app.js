// // ボタントグル
// // App = React.createClass({
// // 	getInitialState: function(){
// // 		return {
// // 			switch1: true
// // 		};
// // 	},
// // 	handleSwitch1:function(){
// // 		this.setState({
// // 			switch1: !this.state.switch1
// // 		});
// // 	},
// // 	render: function(){
// // 		return <div>
// // 		Switch:1
// // 		<button onClick={this.handleSwitch1}>
// // 		{this.state.switch1 ? "on" : "off"}
// // 		</button>
// // 		</div>;
// // 	}
// // });
// // React.render(<App />,document.body);
//
//
// var CommentBox = React.createClass({
// 	getDeaultProps: function(){
// 		return {data:[]};
// 	},
// 	render: function(){
// 		return (
// 			<div className="commentBox">
// 				<h1>Comments{this.props.name}</h1>
// 				<CommentList />
// 				<CommentForm />
// 			</div>
// 		);
// 	}
// });
// var CommentList = React.createClass({
// 	render: function(){
// 		return (
// 			<div className="commentList">
// 				<Comment author="PeteHUnt">This is one commment</Comment>
// 				<Comment author="JordanWalke">This is another comment</Comment>
// 			</div>
// 		);
// 	}
// });
// var CommentForm = React.createClass({
// 	render: function(){
// 		return (
// 			<div className="commentForm">
// 			Hello, world! I am a CommentForm
// 			</div>
// 		);
// 	}
// })
// var Comment = React.createClass({
// 	render: function(){
// 		return (
// 			<div className="comment">
// 			<h2 className="commentAuthor">
// 				{this.props.author}
// 			</h2>
// 				{this.props.children}
// 			</div>
// 		)
// 	}
// })
//
//
// React.render(
// 	<CommentBox />,document.getElementById('content')
// )
//


//
//
//
// //////ボタンを押下と同時に親stateが変わってほしい
// var CountButtonRight = React.createClass({
// 	getInitialState:function(){
// 		return {count:0};
// 	},
// 	render:function(){
// 		return(
// 			<div className="leftbutton">
// 				<div className="rightbutton" onClick={this.handClick}>
// 					<button>{this.state.count}</button>
// 				</div>
// 			</div>
// 		);
// 	},
// 	handClick(){
// 		return this.setState(
// 			{count: this.state.count + 1}
// 		);
// 	}
// });
// var CountButtonLeft = React.createClass({
// 	getInitialState:function(){
// 		return {count:0};
// 	},
// 	render:function(){
// 		return(
// 			<div className="leftbutton">
// 				<div onClick={this.handClick}>
// 					<button>{this.state.count}</button>
// 				</div>
// 			</div>
// 		);
// 	},
// 	handClick(){
// 		this.setState(
// 			{count: this.state.count - 1}
// 		);
// 	}
// });
// var CountButton = React.createClass({
// 	getInitialState:function(){
// 		return {count:0};
// 	},
// 	render:function(){
// 		return(
// 			<div className="contentButton">
// 				<CountButtonRight />
// 				<CountButtonLeft />
// 				{this.state.count}
// 			</div>
// 		);
// 	}
// });
// React.render(
// 	<CountButton />,document.getElementById('content')
// )





// var Hello = React.createClass({
//   render() {
//     return <div>{this.props.children}</div>;
//   }
// });
//
// console.log(
//   React.render(
//     <Hello>xxx</Hello>,document.body
//   ).props.children
// );
//
















// var　myblood = 'お笑い',myimmditay = 'Web',behave = '旅';
// function Mind(props,elem){
// 	this.props=props;
// 	this.elem=elem;
// }
// var morita = new Mind('遠くの真面目より近くのスケベ','冷麺をふうふうする人見た');
// Mind.prototype.createAttitude = function(){
// 	return '<h1>' + hertOfRichess = this.props + this.elem +'</h1>';
// }
// document.getElementById('theme').innerHML = Itentity();





// innerHTMLにアクセス
// var AnswerRadioInput = React.createClass({
//
// });
// React.render(
// 	<AnswerRadioInput />,document.getElementById('content')
// );
//
//
//
//
//
//
//
//
//
//



//5/5
//
//
//
//



var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Hello = React.createClass({
  getInitialState: function() {
    return {
      value: '(´・ω・｀)'
    };
  },
  onClick: function() {
    var value = this.state.value === '(´・ω・｀)' ? '(｀･ω･´)ゞ' : '(´・ω・｀)';
    this.setState({ value: value });
  },
  render: function() {
    var value = <span className="sample" key={this.state.value}>{this.state.value}</span>;
    return (
      <div>
        <div>Animation!!<button onClick={this.onClick}>click!!</button></div>
        <CSSTransitionGroup transitionName="sample">
          {value}
        </CSSTransitionGroup>
      </div>
    );
  }
});

React.render(<Hello />, document.body);
