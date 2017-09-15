import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut,TodoModel} from './leancloud'
import LeftAside from './LeftAside'

import './App.css'
import 'normalize.css'
import './reset.css'
import './iconfont.css'



class App extends Component {
  constructor(props){
    super()
    this.state = {
      user: getCurrentUser() ||{},
      newTodo: '',
      todoList: []
      
    }
    let user = getCurrentUser() 
    if(user){
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos  
        this.setState(stateCopy)
        })
    }
  }
  
  render() {
    let todos = this.state.todoList
      .filter((item)=>!item.deleted)
      .map((item,index)=>{
      return (<li key={index}> 
        <TodoItem todo={item} onToggle={this.toggle.bind(this)}
        onDelete={this.delete.bind(this)}/>
        </li>)
    })
    return (
      <div className="App">
        <aside>
          <LeftAside user={this.state.user}/>
          {this.state.user.id ? <button className=" iconfont icon-tuichu" onClick={this.signOut.bind(this)}></button> : null}
        </aside>

        <main>
          <h1>{this.state.user.username||'我'}的待办
          </h1>
          <div className="inputWrapper">
            <TodoInput content={this.state.newTodo} 
              onChange={this.changeTitle.bind(this)}
              onSubmit={this.addTodo.bind(this)}/>
          </div>
          <ol className="todoList" >
            {todos}
          </ol>
          {this.state.user.id ? null :
          <UserDialog 
            onSignIn={this.onSignUpOrSignIn.bind(this)}
            onSignUp={this.onSignUpOrSignIn.bind(this)}
          />}

        </main>
      </div>
    );
  }
  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
    if(user){
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos  
        this.setState(stateCopy)
        })
    }
  }
  
  toggle(e, todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
   }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    if(event.target.value){
      let newTodo={
        title: event.target.value,
        status: '',
        deleted: false
      }
      TodoModel.create(newTodo, (id) => {
        newTodo.id = id
        this.state.todoList.push(newTodo)
        this.setState({
          newTodo: '',
          todoList: this.state.todoList
        })
      },(error)=>{
        console.log(error)
      })
    }else{
      alert('请输入待办内容')
    }
  }
  delete(event,todo){
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
  
}

export default App;


