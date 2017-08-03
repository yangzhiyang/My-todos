import React, {Component} from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import './SignInOrSignUp.css'


 export default class SignInOrSignUp extends Component {
   constructor (props) {
     super(props)
     this.state = {
       selected: 'signIn'
     }
   }
 
   switch (e) {
     this.setState({
       selected: e.target.value
     })
   }
 
  render () {
    return (
      <div className="signInOrSignUp">
        <nav>
        <label>
          <input type="radio" value="signIn"
            checked={this.state.selected === 'signIn'}
            onChange={this.switch.bind(this)}
          /> 
          <span className={this.state.selected ==='signIn'?'checked':null}>
            登录
          </span>
        </label>           
        <label>
          <input type="radio" value="signUp"
            checked={this.state.selected === 'signUp'}
            onChange={this.switch.bind(this)}
          /> 
          <span className={this.state.selected ==='signUp'?'checked':null}>
            注册
          </span>

        </label>
        </nav>
          <div className="panes">
            {this.state.selected === 'signIn' ?
              <SignInForm formData={this.props.formData}
                onChange={this.props.onChange}
                onSubmit={this.props.onSignIn}
                onForgotPassword={this.props.onForgotPassword}
              />
            : null}
            {this.state.selected === 'signUp' ?
              <SignUpForm formData={this.props.formData}
                onSubmit={this.props.onSignUp}
                onChange={this.props.onChange}
              />
            : null}
          </div>
        </div>
    )
  }
}