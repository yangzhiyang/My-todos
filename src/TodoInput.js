import React from 'react';
import './TodoInput.css'

function submit(props,e){
  if(e.key === 'Enter'){
        props.onSubmit(e)
  }
}
function changeTitle(props,e){
  props.onChange(e)
}
export default function(props){
  return <input placeholder="请输入您的待办事项，按回车确认" className="TodoInput" type="text" value={props.content}
    onChange={changeTitle.bind(null,props)}
    onKeyPress={submit.bind(null,props)}
  />
}