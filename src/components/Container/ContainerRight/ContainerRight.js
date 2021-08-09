import React from "react"
import ContainerRightAddForm from "./ContainerRightAddForm"
import ContainerRightButton from "./ContainerRightButton"
import ContainerRightShowNoti from "./ContainerRightShowNoti"
import { useState} from "react"
import { makeStyles } from "@material-ui/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        padding: '20px',
    }

})

const RightContainer = () => {
    const classes = useStyles()
    const [showAddNoti, setShowAddNotis] = useState(true)
    const [notiList, setNotiList] = useState([])

    return (
        <div className={classes.root} style={{ position: "sticky", top: "5rem" }}>
            <div className={classes.info}>
                <Typography variant="inherit"><b>Notification</b></Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <ContainerRightButton onShowContent={() => setShowAddNotis(!showAddNoti)} showContent={showAddNoti} />
                {!showAddNoti && <ContainerRightAddForm notiList={notiList} setNotiList={setNotiList}/>}
                <ContainerRightShowNoti />
            </div>
        </div>
    )
}

export default RightContainer
