import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar } from 'react-bootstrap'
import MyList from './MyList'
import uuidv4 from 'uuid/dist/v4';

const LOCAL_STORAGE_KEY = 'listApp.items'

function App() {
  const [items, setItems] = useState([])
  const itemsnameRef = useRef()

  useEffect(() =>{
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setItems(storedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function toggleItem(id) {
    const newItems = [...items]
    const item = newItems.find(item => item.id === id)
    item.complete = !item.complete
    setItems(newItems)
  }

  function handleAddItem(e) {
    const name = itemsnameRef.current.value
    if (name === '') return
    setItems(prevItems => {
      return [...prevItems, { id: uuidv4(), name: name, complete: false}]
    })
    itemsnameRef.current.value = null
  }

  function handleClearItems() {
    const newItems = items.filter(item => !item.complete)
    setItems(newItems)
  }

  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        Test Logo
      </Navbar.Brand>
    </Navbar>
    
     <MyList items ={items} toggleItem ={toggleItem} />
     <input ref={itemsnameRef} type="text" />
     <button onClick={handleAddItem}>Add Item</button>
     <button onClick={handleClearItems}> Clear Item</button>
     <div>{items.filter(item => !item.complete).length} items left</div>
    </>
  )
}

export default App;
