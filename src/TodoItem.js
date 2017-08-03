import React,{Component} from 'react';
import './TodoItem.css'
export default class TodoItem extends Component{
    
    render(){
        return (
       <div className="TodoItem"> 
       <input type="checkbox" 
         className={this.props.todo.status}
         checked={this.props.todo.status === 'completed'}
         onChange={this.toggle.bind(this)}/>
        <i onClick={this.toggle.bind(this)} className={"iconfont "+(this.props.todo.status === 'completed' ? "icon-checkbox1" : "icon-checkbox")}></i>
               
        <span className="title">{this.props.todo.title}</span>
       <button  className="iconfont icon-shanchu" onClick={this.delete.bind(this)}></button>
       </div>
     )
    } 
    toggle(e){
        this.props.onToggle(e, this.props.todo)
    }
    delete(e){
        this.props.onDelete(e,this.props.todo)
    }
}