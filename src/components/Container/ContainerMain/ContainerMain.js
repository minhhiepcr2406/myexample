import { makeStyles, Typography } from '@material-ui/core'
import ContainerMainBox from "./ContainerMainBox"
import ContainerMainComment from "./ContainerMainComment"
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        minHeight: "1007px",
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        padding: '20px',
        backgroundColor: "white",
        border: '1px solid #e8e8e8',
        borderRadius: '3px',
    },
})

const MainContainer = () => {
    const classes = useStyles()

    const acc = useSelector(state => state.user)
    
    return (
        <div className = {classes.root}>
            <div className = {classes.info}>
                <Typography variant = "inherit"><b>News</b></Typography>
            </div>
            <ContainerMainBox acc = {acc} />
            <ContainerMainComment acc = {acc} />
        </div>
    )
}

export default MainContainer


