import React from 'react'

import LeftContainer from "./ContainerLeft/ContainerLeft"
import MainContainer from "./ContainerMain/ContainerMain"
import RightContainer from "./ContainerRight/ContainerRight"

import { makeStyles } from '@material-ui/styles'
import { Grid, Container } from '@material-ui/core'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import LectureMain from './Lecture/LectureMain'
import LectureAdd from './Lecture/LectureAdd'
import LectureAddForm from './Lecture/LectureAddForm'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
    }
})

const Mcontainer = () => {
    const classes = useStyles()
    return (
        <Router>
            <Container maxWidth = "xl">
                <Grid container className = {classes.root}>
                    <Grid item xs = {2}>
                        <LeftContainer />
                    </Grid>
                    <Grid item xs = {5}>
                        <Route exact path = "/newsfeed" component = {MainContainer} />
                        <Route exact path = "/lecture" component = {LectureMain} />
                        <Route exact path = '/lecture/add' component = {LectureAdd} />
                    </Grid>
                    <Grid item xs = {3}>
                        <Route exact path = "/newsfeed" component = {RightContainer} />
                        <Route exact path = "/lecture/add" component = {LectureAddForm}/>
                    </Grid>
                </Grid>
            </Container>
        </Router>
        
    )
}

export default Mcontainer
