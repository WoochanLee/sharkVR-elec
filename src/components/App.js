import React from 'react';
import ReactDOM from 'react-dom';

import SplitPane from 'react-split-pane';

import Title from './Title';
import CustomerTable from './CustomerTable';
import WatingTable from './WaitingTable';
import style from '../../public/css/style.css';
import WaitingTable from './WaitingTable';

//import style from './css/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    
  }
  
  render() {
    let windowHeight = this.state.height;
    let windowWidth = this.state.width;
    return(
      <div style = {{minHeight:768, minWidth:1280, height: windowHeight, position: 'relative'}}>
        <img className='fullImage'/>
        <SplitPane split="vertical" minSize={850} maxSize={windowWidth-450} defaultSize={850} className="primary">
          <div className='mainDiv'>
            <div className='title'>
              <Title/>
            </div>
            <div className='customerTableDiv'>
              <table className='sizeFull'>
                <tbody className='sizeFull'>
                  <tr className='customerTableTr'>
                    <td className='customerTableTd'><CustomerTable color={'#e9655f'}></CustomerTable></td>
                    <td className='customerTableTd'><CustomerTable color={'#e9aa5f'}></CustomerTable></td>
                    <td className='customerTableTd'><CustomerTable color={'grey'}></CustomerTable></td>
                    <td className='customerTableTd'><CustomerTable color={'#1e73d8'}></CustomerTable></td>
                  </tr>
                  <tr className='customerTableTr'>
                    <td className='customerTableTd'><CustomerTable color={'#5fcce9'}></CustomerTable></td>
                    <td className='customerTableTd'><CustomerTable color={'#aa5fe9'}></CustomerTable></td>
                    <td className='customerTableTd'><CustomerTable color={'#e9e45f'}></CustomerTable></td>
                    <td className='customerTableTd'><CustomerTable color={'#93e95f'}></CustomerTable></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='rightSideSpace'>
            <WaitingTable windowHeight={windowHeight}/>
          </div>
        </SplitPane>
      </div>
    );
  }
}

App.defaultProps = {
  name: "llll"
};

ReactDOM.render(<App/>,document.getElementById('root'));