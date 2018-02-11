import React from 'react';
import ReactDOM from 'react-dom';

import Table from 'rc-table';
import Animate from 'rc-animate';
import 'rc-table/assets/index.css';
import 'rc-table/assets/animation.css';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

const AnimateBody = (props) =>
  <Animate transitionName="move" component="tbody" {...props} />;

class WaitingTable extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      { title: '순서', dataIndex: 'key', key: 'a', width: 50 },
      { title: '이름', dataIndex: 'name', key: 'b', width: 100 },
      { title: '휴대폰번호', dataIndex: 'phone', key: 'c', width: 200 },
      {
        title: '번호보기', dataIndex: '', key: 'd', render: (text, record) =>
        <a onClick={e => this.onShow(record.key, e)} href="#">번호보기</a>,
      },
      {
        title: '삭제', dataIndex: '', key: 'e', render: (text, record) =>
        <a onClick={e => this.onDelete(record.key, e)} href="#">삭제</a>,
      },
    ];

    this.state = {
      nowIndex: 1,
      newName: '',
      newPhone: '',
      data: [],
      phoneData: []
    }

    this.newWaitingAdd = this.newWaitingAdd.bind(this);
  }

  onDelete(key, e) {
    e.preventDefault();
    let data = this.state.data.filter(item => item.key !== key);
    let phoneData = this.state.phoneData.filter(item => item.key !== key);
    for(let i=0;i<data.length;i++){
      data[i].key = i+1;
      phoneData[i].key = i+1;
    }

    this.setState({ 
      data: data,
      phoneData: phoneData,
      nowIndex: this.state.nowIndex - 1
    });
  }

  onShow(key, e) {
    let data = [...this.state.data];
    let phoneData = [...this.state.phoneData];

    if(!phoneData[key-1].isShow){
      data[key-1].phone = phoneData[key-1].phone;
      phoneData[key-1].isShow = true;
    }else{
      data[key-1].phone = phoneData[key-1].secretPhone;
      phoneData[key-1].isShow = false;
    }
    
    this.setState({
      data: data,
      phoneData: phoneData
    })
  }

  newWaitingAdd() {
    if(this.state.newName!=''){
      const phoneData = [...this.state.phoneData];
      const secretPhone = this.state.newPhone.replace(/\d/g, '*');

      phoneData.push({
        key: this.state.nowIndex,
        isShow: false,
        phone: this.state.newPhone,
        secretPhone: secretPhone
      })

      const data = [...this.state.data];
      data.push({
        key: this.state.nowIndex,
        name: this.state.newName,
        phone: secretPhone
      });
  
      this.setState({ 
        data: data,
        phoneData: phoneData,
        newName: '',
        newPhone: '',
        nowIndex: this.state.nowIndex+1
      });
    }
  }

  render(){
    return (
      <div className='waitingDiv'>
        <div className='waitingTitleDiv'>
          <img style={{height:'auto', width:'100%'}} className='logoImage' src='image/waiting.png'></img>
        </div>
        <div className='waitingTableDiv'>
          <Table
          style={{fontFamily: 'NanumGothicR', fontSize: 15}}
            scroll={{y:this.props.windowHeight*0.62}}
            columns={this.columns}
            data={this.state.data}
            components={{
              body: { wrapper: AnimateBody },
            }}
          />
        </div>
        <div className='waitingInputDiv'>
          <div className='waitingNameText'>이름</div>
          <input className='waitingNameInput' value={this.state.newName} onChange={(e) => this.setState({newName: e.target.value})}/>
          <div className='waitingPhoneText'>휴대폰번호</div>
          <input className='waitingPhoneInput' value={this.state.newPhone} onChange={(e) => this.setState({newPhone: e.target.value})} onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.newWaitingAdd();
                }
              }}/>
          <AwesomeButton style={{fontFamily: 'NanumGothicR', fontSize: 13, minWidth: '100px', height: '70%', margin: '1%'}} type="facebook" action={this.newWaitingAdd}>대기자 추가</AwesomeButton>
        </div>
      </div>
    )
  }  
}

export default WaitingTable;