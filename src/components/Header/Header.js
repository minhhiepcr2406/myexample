import NaviBar from "./NaviBar"
import HeaderAccount from "./HeaderAccount"
import { IconButton, makeStyles } from "@material-ui/core"
import { Home } from "@material-ui/icons"

const useStyles = makeStyles({
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        border: "1px solid #e8e8e8",
        textAlign: "center",
        padding: "5px",
        zIndex : 1,
    },
    logo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "10%",
        padding: "14px 16px",
        color: "green",
    },
    account: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "10%",
        padding: "14px 16px",
    }
})

const Header = () => {
    const classes =  useStyles()
    return (
        <div className = {classes.header} style = {{position: "sticky", top: 0}}>
            <div className = {classes.logo}>
                
                <IconButton>
                    <Home />
                </IconButton>
                
            </div>
            <NaviBar />
            <div className = {classes.account}>
                <HeaderAccount />
            </div>
        </div>
    )
}

export default Header