import React, {Component} from 'react';
 
 export default class ForgotPasswordForm extends Component {
   render () {
     return (
       <div className="forgotPassword">
         <h3>
           重置密码
         </h3>
         <form className="forgotPassword" onSubmit={this.props.onSubmit}> {/* 登录*/}
           <div className="row">
             <input type="text" placeholder="邮箱" value={this.props.formData.email}
               onChange={this.props.onChange.bind(null, 'email')}/>
           </div>
           <div className="row actions">
             <button type="submit">发送重置邮件</button>
             <span onClick={this.props.onSignIn}>返回登录</span>
           </div>
         </form>
       </div>
     )
   }
 }