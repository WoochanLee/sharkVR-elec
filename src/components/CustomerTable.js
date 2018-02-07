import React from 'react';
import ReactDOM from 'react-dom';
import { Line, Circle } from 'rc-progress';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

import moment from 'moment';
import Util from './Util';
import { relative } from 'path';

const timeFormat = 'HH:mm:ss';
const now = moment().hour(0).minute(0).second(0);

function onChange(value) {
  console.log(value && value.format(timeFormat));
}

class CustomerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      initPeople: 0,
      timerID: 0,
      initTime: 0,
      time: 0,
      remainTime: 0,
      startButtonText: '사용 시작',
      barColor: '#5f9ee9',
      initHour: '00',
      initMinute: '00',
      initSecond: '00',
      remainHour: '00',
      remainMinute: '00',
      remainSecond: '00',
      plusTime: ''
    };

    this.peopleChange = this.peopleChange.bind(this);
    this.minuteChange = this.minuteChange.bind(this);
    this.startButtonClick = this.startButtonClick.bind(this);
    this.timeSet = this.timeSet.bind(this);
    this.hourPlus = this.hourPlus.bind(this);
    this.hourMinus = this.hourMinus.bind(this);
    this.minutePlus = this.minutePlus.bind(this);
    this.minuteMinus = this.minuteMinus.bind(this);
    this.checkTimeColor = this.checkTimeColor.bind(this);
    this.checkOverTime = this.checkOverTime.bind(this);
    this.remainTimeRefresh = this.remainTimeRefresh.bind(this);
  }

  timeSet() {
    let remainTime = this.state.initTime - this.state.time;
    this.setState({
      time: this.state.time + 1,
      remainTime: remainTime,
      remainHour: Util.secToHour(remainTime),
      remainMinute: Util.secToMin(remainTime),
      remainSecond: Util.secToSec(remainTime)
    })
    this.checkTimeColor(remainTime);
    this.checkOverTime();
  }

  checkTimeColor(remainTime) {
    if(remainTime>600){
      this.setState({
        barColor: '#5f9ee9'
      })
    }else if(remainTime<=600&&remainTime>0){
      this.setState({
        barColor: '#d85fe9'
      })
    }else{
      this.setState({
        barColor: '#e95f70'
      })
    }
  }

  checkOverTime() {
    if(this.state.remainTime<0){
      this.setState({
        plusTime: '+'
      })
    }else{
      this.setState({
        plusTime: ''
      })
    }
  }

  startButtonClick(e) {
    if(this.state.initPeople>0&&this.state.initTime>0){
      if(!this.state.start) {
        let timerID = setInterval(this.timeSet, 10);
        this.setState({
          start: true,
          timerID: timerID,
          startButtonText: '사용 종료'
        });
      }
    }
    if(this.state.start){
      clearInterval(this.state.timerID);
      this.setState({
        start: false,
        startButtonText: '사용 시작',
        initPeople: 0,
        initTime: 0,
        time: 0,
        remainTime: 0,
        barColor: '#5f9ee9',
        initHour: '00',
        initMinute: '00',
        initSecond: '00',
        remainHour: '00',
        remainMinute: '00',
        remainSecond: '00',
        plusTime: ''
      })
    }
  }
  
  peopleChange(value) {
    this.setState({
      initPeople: value
    })
  }

  remainTimeRefresh(remainTime) {
    this.setState({
      remainTime: remainTime,
      remainHour: Util.secToHour(remainTime),
      remainMinute: Util.secToMin(remainTime),
      remainSecond: Util.secToSec(remainTime)
    })
  }

  minuteChange(value) {
    let initTime = parseInt(value.format('HH')*3600) + parseInt(value.format('mm')*60) + parseInt(value.format('ss'));
    let remainTime = initTime - this.state.time;
    this.setState({
      initTime: initTime,
      initHour: Util.secToHour(initTime),
      initMinute: Util.secToMin(initTime),
      initSecond: Util.secToSec(initTime),
    })
    this.remainTimeRefresh(remainTime);
  }

  hourPlus() {
    let initTime = this.state.initTime + 3600;
    let remainTime = initTime - this.state.time;
    this.setState({
      initTime: initTime,
      initHour: Util.secToHour(initTime),
      initMinute: Util.secToMin(initTime),
      initSecond: Util.secToSec(initTime),
      
    })
    this.remainTimeRefresh(remainTime);
    this.checkOverTime();
    this.checkTimeColor(remainTime);
  }

  hourMinus() {
    let initTime = this.state.initTime - 3600;
    if(initTime<0){
      initTime = 0;
    }
    let remainTime = initTime - this.state.time;
    this.setState({
      initTime: initTime,
      initHour: Util.secToHour(initTime),
      initMinute: Util.secToMin(initTime),
      initSecond: Util.secToSec(initTime)
    })
    this.remainTimeRefresh(remainTime);
    this.checkOverTime();
    this.checkTimeColor(remainTime);
  }

  minutePlus() {
    let initTime = this.state.initTime + 300;
    let remainTime = initTime - this.state.time;
    this.setState({
      initTime: initTime,
      initHour: Util.secToHour(initTime),
      initMinute: Util.secToMin(initTime),
      initSecond: Util.secToSec(initTime)
    })
    this.remainTimeRefresh(remainTime);
    this.checkOverTime();
    this.checkTimeColor(remainTime);
  }

  minuteMinus() {
    let initTime = this.state.initTime - 300;
    if(initTime<0){
      initTime = 0;
    }
    let remainTime = initTime - this.state.time;
    this.setState({
      initTime: initTime,
      initHour: Util.secToHour(initTime),
      initMinute: Util.secToMin(initTime),
      initSecond: Util.secToSec(initTime)
    })
    this.remainTimeRefresh(remainTime);
    this.checkOverTime();
    this.checkTimeColor(remainTime);
  }

  render() {
    let style = {
      position: 'relative',
      borderBottom: '2px solid grey',
      borderLeft: '2px solid grey',
      borderRight: '2px solid grey',
      borderTop: '40px solid ' + this.props.color,
      height: '100%',
      backgroundColor: '#F7F7F7',
      borderRadius: '15px'
    }
    return(
      <div style = {style}>
        <div className='customerTableBackground'>

        </div>
        <div className='circleMainDiv'>
          <div className='circleInnerDiv'>
              <div className='initTimeDiv'>{this.state.initHour}:{this.state.initMinute}</div>
              <div style={{color:this.state.barColor}} className='flowTimeDiv'>{this.state.plusTime}{this.state.remainHour}:{this.state.remainMinute}</div>
              <div style={{fontFamily: 'NanumPenScriptR', fontSize: 25}}>{this.state.initPeople} 인</div>
          </div>
          <div className='circleDiv'>
            <Circle percent={this.state.remainTime <= 0 ? 100 : (this.state.time/this.state.initTime)*100} strokeWidth="5" strokeColor={this.state.barColor} trailWidth="5" trailColor={'#DAEBFA'} />
          </div>
        </div>
        <div className='tableInputWrapDiv'>
          {
            this.state.start ?
            null
            : <div className='tableInputDiv'>
                <div className='nameText'>인원</div>
                <InputNumber className='peopleInput'
                  onChange={this.peopleChange}
                  min={0}
                  max={100}
                />
                <div className='nameText'> 시간</div>
                <TimePicker 
                  className='minuteInput'
                  onChange={this.minuteChange}
                  defaultValue={now}
                />
              </div>
          }
          {
            this.state.start ?
            <div className='timePlusDiv'>
              <AwesomeButton style={{fontFamily: 'NanumPenScriptR', fontSize: 20, width: '23%', height: '100%', marginLeft: '2%'}} type="facebook" action={this.hourPlus}>H+</AwesomeButton>
              <AwesomeButton style={{fontFamily: 'NanumPenScriptR', fontSize: 20, width: '23%', height: '100%', marginRight: '2%'}} type="reddit" action={this.hourMinus}>H-</AwesomeButton>
              <AwesomeButton style={{fontFamily: 'NanumPenScriptR', fontSize: 20, width: '23%', height: '100%', marginLeft: '2%'}} type="facebook" action={this.minutePlus}>5M+</AwesomeButton>
              <AwesomeButton style={{fontFamily: 'NanumPenScriptR', fontSize: 20, width: '23%', height: '100%', marginRight: '2%'}} type="reddit" action={this.minuteMinus}>5M-</AwesomeButton>
            </div>
            : null
          }
        </div>
        <div className='startButton'>
          <AwesomeButton style={{fontFamily: 'NanumPenScriptR', fontSize: 20, width: '91%', height: '100%'}} type="facebook" className='startButton' action={this.startButtonClick}>{this.state.startButtonText}</AwesomeButton>
        </div>
      </div>
    )
  }
}

export default CustomerTable;