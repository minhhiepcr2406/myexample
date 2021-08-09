import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
    topnav: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: "60%",
        "& a": {
            width: "100px",
            color: "black",
            textAlign: "center",
            textDecoration: "none",
            padding: "14px 16px",
        }
    }
})

const NaviBar = () => {
    const classes = useStyles()
    return (
        <div className = {classes.topnav}>
        </div>
    )
}

export default NaviBar
