import React from 'react';
import ReactDOM from 'react-dom';

class Title extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    let titleText = '매장관리 프로그램';
    return(
      <img style={{height: '100%', width: 'auto'}} className='logoImage' src='image/sharkVR_logo.png'/>
    );
  }
}

export default Title;