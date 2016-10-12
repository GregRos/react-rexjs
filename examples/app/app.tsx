import React = require('react');
import {TsComponent} from "../../src/lib/ts-component";
import {RexScalar, Rexes} from "../jspm_packages/npm/rexjs@0.2.1/dist/index";

require('../jspm_packages/github/twbs/bootstrap@3.3.7/css/bootstrap.css!css')
require('../jspm_packages/github/twbs/bootstrap@3.3.7/css/bootstrap-theme.css!css')
interface User {
	firstName : string;
	lastName : string;
	email : string;
}

interface UserEditProps {
	user : RexScalar<User>;
}

class UserEdit extends TsComponent<UserEditProps, {}> {
	context : {test : string};
	render() {
		let test = this.context.test;
		let {user} = this.props;
		let userValue = user.value;

		return <div className="fdf">
			Test: {test}
			<div className="form-group">
				<label>First Name</label>
				<input type="text" className="form-control" value={userValue.firstName} onChange={e => user.mutate(u => u.firstName = e.target['value'])}/>
			</div>
			<div className="form-group">
				<label>Last Name</label>
				<input type="text" className="form-control" value={userValue.lastName} onChange={e => user.mutate(u => u.lastName = e.target['value'])}/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input type="text" className="form-control" value={userValue.email} onChange={e=> user.mutate(u => u.email = e.target['value'])}/>
			</div>
		</div>
	}
}

interface AppState {
	user : User;
}

export class App extends TsComponent<{}, AppState> {

	static childContextTypes = {
		test : React.PropTypes.string.isRequired
	};

	static getChildContext() {
		return {test : ""}
	}
	constructor(props) {
		super(props);
		this.state = {
			user : {
				email : "",
				lastName : "",
				firstName : ""
			}
		}
	}
	render() {
		let user = Rexes.var_(this.state.user).listen_(u => this.withState(s => s.user = user));
		return <div className="container">
			<h1>Edit User</h1>
			<div><UserEdit user={user}/></div>
			<div>
				<pre>
					{JSON.stringify(user, null, 2)}
				</pre>
			</div>
		</div>;
	}
}