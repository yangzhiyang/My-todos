import React from 'react';
import './iconfont.css';


export default function (props) {
  return (
    <form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
      <div className="row">
        <input type="text" placeholder="用户名" value={props.formData.username}
          onChange={props.onChange.bind(null, 'username')}/>
      </div>
      <div className="row">
        <input type="password" placeholder="密码" value={props.formData.password}
          onChange={props.onChange.bind(null, 'password')}/>
      </div>
      <div className="row actions">
        <button type="submit">登录</button>
        <span onClick={props.onForgotPassword}>忘记密码了？</span>
      </div>
    </form>
  )
 }