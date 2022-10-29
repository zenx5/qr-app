import {QRCodeCanvas} from 'qrcode.react';
import { useState } from 'react';
function App() {
  const [value, setValue] = useState('')
  const [qrlist, setQrlist] = useState([])

  const changeEventHandler = ({target}) =>{
    setValue(prevValue => target.value)
  }

  const clickEventHandler = ()=>{
    setQrlist(prevQrlist => [...prevQrlist, value])
    setValue( prevValue => '' )
  }

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <div className="App" style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width:'80%'
      }}>
          <QRCodeCanvas value={value} />
          
            <input type='text' value={value}  style={{margin:'10px'}} onChange={changeEventHandler}/>
            <button onClick={clickEventHandler}>Agregar</button>

          
      </div>
      <div style={{width:'20%', borderLeft:'1px solid #030303'}}>
        {
          qrlist.map( item => (<div style={{display:'flex', alignItems:'center', margin:'10px', justifyContent:'space-between'}}><QRCodeCanvas style={{width:'64px', height:'64px'}} value={item} /> <i>{item}</i></div>))
        }
      </div>
    </div>
  );
}

export default App;
