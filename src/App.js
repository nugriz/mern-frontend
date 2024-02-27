import axios from 'axios'
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([])
  const [read, setRead] = useState(false)
  const [create, setCreate] = useState(false)
  const [update, setUpdate] = useState(false)
  const url = 'https://mern-back-54386070f9e5.herokuapp.com/api/books/'
  const header = {
    'content-type': 'application/json',
  }

  useEffect(() => {
    getData()
  }, [])

  function getData(){
    axios.get(url).then((res) => {
      var result = res.data
      result.reverse()
      setData(result)
    })
  }

  function send(e){
    create ? post(e) : put(e)
  }

  function post(e){
    e.preventDefault()
    const title = document.getElementById('title').value
    const text = document.getElementById('text').value
    axios.post(url, {
      title: title,
      author: text
    }, {headers: header}).then(() => {
      getData()
      setCreate(false)
    })
  }

  function put(e){
    e.preventDefault()
    axios.put(url + update._id, {
      title: document.getElementById('title').value,
      author: document.getElementById('text').value
    }).then(() => {
      getData()
      setUpdate(false)
    })
  }

  function destroy(id){
    axios.delete(url + id).then(()=>{
      setRead(false)
      getData()
    })
  }

  const form_no = {
    display: 'none'
  }

  const home = create || update ? form_no : {} 

  const form = (
    <form id='form' onSubmit={send} style={!create && !update ? form_no : {} }>
      <div>
        <label htmlFor="exampleInputTitle1"><h3>Title</h3></label>
        <input type="username" id="title"/>
      </div>
      <div>
        <label htmlFor="exampleInputdescription1"><h3>Text</h3></label>
        <textarea id="text" name="w3review" rows="25" style={{width: '80vw'}}></textarea>
      </div>
      <button type="submit">{create ? 'Post' : 'Update'}</button>
    </form>
  )

  const blog = (
    <div id='iblog'>
      <div style={{backgroundColor: 'white', borderRadius: '30px', padding: '20px'}}>
        <h1>{read.title}</h1>
        <p>{read.author}</p>
        <button onClick={() => setRead(false)}>back</button>
        <button onClick={() => {setUpdate(read); setRead(false)}}>update</button>
        <button onClick={() => destroy(read._id)}>delete</button>
      </div>
    </div>
  )

  return (
    <div className="App">
      {read ? blog : <header className="App-header">
        {form}
        <div style={home}>
          <h1>Sample Blog</h1>
          <div onClick={() => setCreate(true)} id='add' style={{width: '45px', margin: 'auto'}}><h6 style={{margin:0}}>Buat</h6></div>
          <div style={{height: '40px', width: '10px'}}></div>
          <div id='blog'>
            {data.reverse().map((dt, index) => (
              <div className='child' key={index} onClick={() => setRead(dt)}>
                  <hr />
                  <h1>{dt.title}</h1>
                  {dt.author}
              </div>
            ))}
          </div>
        </div>
      </header>}
    </div>
  );
}

export default App;
