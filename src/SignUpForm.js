import React from 'react';
export default function (props) {
  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
      <div className="row">
        <input type="text" placeholder="邮箱" value={props.formData.email}
          onChange={props.onChange.bind(null, 'email')}/>
      </div>
      <div className="row">
        <input type="text" placeholder="用户名(不小于3个字符)" value={props.formData.username}
          onChange={props.onChange.bind(null, 'username')}/>
        {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
      </div>
      <div className="row">
        <input type="password" placeholder="密码(不小于6个字符)" value={props.formData.password}
          onChange={props.onChange.bind(null, 'password')}/>
      </div>
      <div className="row actions">
        <button type="submit">注册</button>
      </div>
    </form>
  )
 }