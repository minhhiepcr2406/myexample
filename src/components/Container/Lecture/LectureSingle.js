import { CardMedia, Grid, Card, Typography, CardContent } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        width: '100%'
    },
    media: {
        height: "140px"
    },
    content: {
        height: "80px",
        fontSize: "15px",
        fontWeight: "bold",
        display:'flex',
        flexDirection: 'column'
    }
})

const LectureSingle = ({lecture}) => {
    const classes = useStyles()
    const id_video_lecture = lecture.lecture.substr(32)
    const img_url = `https://img.youtube.com/vi/${id_video_lecture}/0.jpg`
    return (
        <Grid item xs = {4}>
            <Card className = {classes.card}>
                <CardMedia 
                    className = {classes.media}
                    image = {img_url}
                    title = "thumnail"
                />
                <CardContent className = {classes.content}>
                    <Typography variant = "inherit">
                        {lecture.name}
                    </Typography>
                    <Typography variant = "inherit" style = {{fontSize: '12px', fontWeight: 'normal'}}>
                        {lecture.date_str}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        
    )
}

export default LectureSingle
