import React, { Component } from 'react'
import './LeftAside.css'




export default class LeftAside extends Component {
    constructor(props){
        super(props)
        this.state = {
            time: this.getTime()
        }
        setInterval(()=>{
            this.setState({
                time: this.getTime(),
                asideBars: []
            })
        },1000)
    }
    getTime(){
        let initDate = new Date()
        let hour = initDate.getHours(),
            minute = initDate.getMinutes(),
            second = initDate.getSeconds();
        if(hour < 10){
            hour = '0' + hour
        }
        if(minute < 10){
            minute = '0' + minute
        }
        if(second < 10){
            second = '0' + second
        }
        return hour +':'+minute+':'+second
    }
    addClass(e){
        let liList = document.querySelectorAll('.asideBar>ul>li')
        let children = [].slice.call(liList)
        
        children.forEach((e,index)=>{
            e.classList.remove('checked')
        })
        e.target.classList.add('checked')
        this.setState({
            asideBars: children
        });
        this.props.changeBars(e.target)
    }
    render(){
        return (
            <div className="leftAside">
                <header>
                    <h2>Hello！{this.props.user.username}</h2>
                    <div className="time">{this.state.time}</div>
                </header>
                <nav className="asideBar">
                    <ul>
                        <li className="unfinished checked"
                        onClick={this.addClass.bind(this)}>待完成</li>
                        <li className="finished"
                        onClick={this.addClass.bind(this)}>已完成</li>
                        {/* <li className="recycle"
                        onClick={this.addClass.bind(this)}>回收站</li> */}
                    </ul>
                </nav>
            </div>
        )
    }
}