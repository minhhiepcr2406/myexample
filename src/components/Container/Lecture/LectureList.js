import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormControl, InputAdornment, OutlinedInput, Button, Typography } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import LectureSingle from './LectureSingle'
import { fetchLectures } from './lectureSlice'
import { CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        margin: "10px",
    },
    formControl: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    searchTab: {
        width: '75%',
        height: '50px'
    },
    btn : {
        width: '100%',
        background: 'rgb(30,136,229)',
        color: "white",
        height: '50px'
    },
    gridContainer: {
        width: "100%",
        marginLeft: "0px",
        marginTop: '20px',
    }
    
})

const LectureList = () => {
    const classes = useStyles()
    const lectures = useSelector(state => state.lectures.lectures)
    const dispatch = useDispatch()
    const lecturesStatus = useSelector(state => state.lectures.status)
    const error = useSelector(state => state.lectures.error)

    const [searchText, setSearchText] = useState('')

    useEffect(()=> {
        if (lecturesStatus === 'idle'){
            dispatch(fetchLectures())
        }
    }, [lecturesStatus, dispatch])

    let content = ''
    if (lecturesStatus === 'loading'){
        content = <CircularProgress />
    }
    else if (lecturesStatus === 'successed') {
        content = lectures.length < 1 ? '' : 
        lectures.map(lecture => lecture.name.toLowerCase().includes(searchText.toLowerCase()) && <LectureSingle key = {lecture.lec_id} lecture = {lecture} />)
    }
    else if (lecturesStatus === 'failed'){
        content = <div>{error}</div>
    }

    return (
        <div className = {classes.root}>
            {/* Search tab and create new lecture */ }
            <FormControl className = {classes.formControl}>
                <OutlinedInput
                    className = {classes.searchTab}
                    placeholder = "Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }
                    value = {searchText}
                    onChange = {(e) => setSearchText(e.target.value)}
                />
                <Link to = '/lecture/add' >
                    <Button 
                        className = {classes.btn}
                        variant = "contained"
                    >
                        <Typography variant = "inherit" style = {{textTransform: "none", fontWeight: "bold"}}>
                            Create new lecture
                        </Typography>
                    </Button>
                </Link>
            </FormControl>
            
            {/* Display cart lecture */ }
            <Grid container className = {classes.gridContainer} spacing={2} alignItems = "center">
                {content}
            </Grid>
        </div>
    )
}

export default LectureList
