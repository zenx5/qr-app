import { useState, useEffect } from 'react';
import {QRCodeCanvas} from 'qrcode.react';
import axios from 'axios';

function App() {
  useEffect(()=>{
    (async ()=>{
      await getData()
    })()
    
  },[])
  const [value, setValue] = useState('')
  const [qrlist, setQrlist] = useState([])

  const getData = async (id='')=>{
    const { data } = await axios.get(`http://localhost:5000/qrcodes/${id}`)
    if( !data.error ) setQrlist(prevQrlist => data.data)
  }

  const setData = async (url)=>{
    const protocol = url.match(/.{1,}:\/\//i)
    const { data } = await axios.post(`http://localhost:5000/qrcodes`,{
      url: url,
      protocol: protocol!==null ? protocol[0].split(':')[0] : ''
    })
    console.log( data )
    await getData();
  }

  const deleteData = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/qrcodes/${id}`)
    console.log( data )
    await getData();
  }

  const changeEventHandler = ({target}) =>{
    setValue(prevValue => target.value)
  }

  const clickEventHandler = async ()=>{
    await setData(value)
    setValue( prevValue => '' )
  }

  const deleteEventHandler = (id) => async () => {
    await deleteData(id)
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
          qrlist.map( item => (<div key={item.id} 
                                    style={{
                                      display:'flex',
                                      alignItems:'center',
                                      margin:'10px',
                                      justifyContent:'space-between'
                                    }}>
                                      <QRCodeCanvas style={{width:'64px', height:'64px'}} value={item.url} /> 
                                      <span style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                        <i>{item.url}</i>
                                        <button style={{
                                          width: 'fit-content',
                                          background: 'white',
                                          border: 'none',
                                          cursor: 'pointer'
                                        }} onClick={deleteEventHandler(item.id)}>x</button>
                                      </span>
                              </div>))
        }
      </div>
    </div>
  );
}

export default App;
