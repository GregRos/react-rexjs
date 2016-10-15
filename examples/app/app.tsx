import React = require('react');
import {RexComponent} from "../../src";
import {RexScalar, Rexes} from "rexjs";
interface User {
	firstName : string;
	lastName : string;
	email : string;
}
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../../node_modules/bootstrap/dist/css/bootstrap-theme.css');
interface UserEditProps {
	user : RexScalar<User>;
}

interface InputThingProps {
	text : RexScalar<string>;
}

class InputThing extends RexComponent<InputThingProps, {}> {
	render() {
		let {text} = this.props;
		return <input
			type="text"
			className="form-control"
			value={text.value}
			onChange={e => text.value = e.target['value']}/>;
	}
}

class UserEdit extends RexComponent<UserEditProps, {}> {
	render() {
		let user = this.props.user;
		let userValue = user.value;
		return <div className="fdf">
			<div className="form-group">
				<label>First Name</label>
				<InputThing text={user.member_(x => x.firstName).convert_(x => x.toUpperCase(), x => x.toLowerCase())}/>
			</div>
			<div className="form-group">
				<label>Last Name</label>
				<InputThing text={user.member_(x => x.lastName)}/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<InputThing text={user.member_(x => x.email)}/>
			</div>
		</div>
	}
}

interface AppState {
	user : User;
	visible : boolean;
}


export class App extends RexComponent<{}, AppState> {
	constructor(props) {
		super(props);
		this.state = {
			user : {
				email : "",
				lastName : "",
				firstName : ""
			},
			visible : false
		}
	}
	render() {
		let user = this.state_.member_(x => x.user);
		let block = this.state.visible ? <div><UserEdit user={user}/></div> : null;
		return <div className="container">
			<h1>Edit User</h1>
			{block}
			<div>
				<pre>
					{JSON.stringify(user.value, null, 2)}
				</pre>
			</div>
			<div><button onClick={() => this.withState(s => s.visible = !s.visible)}>adsf</button></div>
		</div>;
	}
}