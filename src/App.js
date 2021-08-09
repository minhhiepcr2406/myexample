import React from 'react'
import './App.css';
import Header from './components/Header/Header'
import Mcontainer from './components/Container/Container';
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  }
})

function App() {
  const classes = useStyles()
  return (
    <Router>
      <div className = {classes.container}>
        <Header />
        <Mcontainer />
      </div>
    </Router>
  )
}
export default App;
