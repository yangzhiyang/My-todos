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
      todoList: [],
      targetBar: "unfinished"  
    }
    let user = getCurrentUser() 
    if(user){
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos  
        this.setState(stateCopy)
        console.log(this.state.todoList);
        
        })
        
    }
  }
  
  render() {
    let Unfinished = this.createTags(this.filterUnfinished())
    let Finished = this.createTags(this.filterFinished())
    let Deleted = this.createTags(this.filterDeleted())
    console.log(this.filterUnfinished());
    let todos = this.setTags(Unfinished,Finished,Deleted)
    return (
      <div className="App">
        <aside>
          <LeftAside user={this.state.user}
          changeBars={this.changeBars.bind(this)}/>
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
        console.log(todos);
        })
    }
    console.log(user);
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
  changeBars(target) {
    console.log(target);
    if(target.classList.contains("unfinished")){
      this.setState({
        targetBar: "unfinished"
      })
    }else if(target.classList.contains("finished")){
      this.setState({
        targetBar: "finished"
      })
    }else{
      this.setState({
        targetBar: "recycle"
      })
    }
  }
  filterUnfinished(){
    let unfinished = []
    this.state.todoList.forEach(item => {
      if(item.status ==='' && item.deleted===false){
        unfinished.push(item)
    }
  })
    return unfinished
  }
  filterFinished(){
    let finished = []
    this.state.todoList.forEach(item => {
      if(item.status !=='' && item.deleted===false){
        finished.push(item)
    }
  })
    return finished
  }
  filterDeleted(){
    let deleted = [];
    this.state.todoList.forEach(item => {
        if (item.deleted) {
            deleted.push(item)
        }
    })
    return deleted
  }
  createTags(todos){
    return todos.map((item,index) => {
      return (<li key={index}> 
        <TodoItem todo={item} onToggle={this.toggle.bind(this)}
        onDelete={this.delete.bind(this)}/>
        </li>
      )
    })
  }
  setTags(unfinished,finished,deleted){
      if (this.state.targetBar === "unfinished") {
        return unfinished;
    } else if (this.state.targetBar === "finished") {
        return finished;
    } else {
        return deleted;
    }
  }
}

export default App;


