import React from 'react'
import './App.css';


const styles = {
  title: {
    textAlign: 'center'
  },
  img: {
    textAlign: 'center',
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    // height:
  }
}
function App() { 
    return (
      <>
        <h1 style={ styles.title }>Welcome to our website! Please signin to continue</h1>
        <img 
        style={ styles.img }
        src='https://cafefcdn.com/thumb_w/650/203337114487263232/2021/3/20/photo1616204308672-16162043088371988196729.jpg' 
        alt='stock market' 
        />
      </>
    )
}

export default App
