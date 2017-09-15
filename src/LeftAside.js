import React, { Component } from 'react'
import './LeftAside.css'

export default class LeftAside extends Component {
    constructor(props){
        super(props)
        this.state = {
            time: '12:00:00'
        }
    }
    render(){
        return (
            <div className="leftAside">
                <header>
                    <h2>Hello,{this.props.user.username}</h2>
                    <div className="time">{this.state.time}</div>
                </header>
                <nav className="asideBar">
                    <ul>
                        <li className="unfinished">待完成</li>
                        <li className="finished">已完成</li>
                        <li className="recycle">回收站</li>
                    </ul>
                </nav>
            </div>
        )
    }
}