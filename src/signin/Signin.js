import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        height: "1000px"
    },
    formControl : {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid f2f2f2",
        borderRadius: "10px",
        height: "600px",
        width: "20%"
    },
    textLogin : {
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: "30px",
        marginBottom: "30px",
    },
    textField : {
        width: "80%",
        marginBottom: "25px",
        marginLeft: "30px",
        marginRight: "30px",
    },

    btn : {
        width: "300px",
        height: "50px",
        borderRadius: "20px",
        marginTop: "30px",
        color: "white",
        border: "none",
        cursor: "pointer",
        backgroundSize: "200%",
        transition: "1s",
        background: "linear-gradient(to left, #fda7df, #9980fa,#fda7df)",
        "&:hover": {
            backgroundPosition: "right",
        }
    }

})

const Signin = () => {
    const classes = useStyles()

    const onSubmit = () => {
        console.log("clicked")
    }

    return (
        <div className = {classes.root} onSubmit = {onSubmit}>
            <form className = {classes.formControl}>
                <Typography className = {classes.textLogin} variant = "inherit"><b>Login</b></Typography>
                <TextField
                    className = {classes.textField}
                    label = "User name"
                />
                <TextField 
                    className = {classes.textField}
                    label = "Password"
                    type = "password"
                />
                <input type = "submit" value = "Sign in" id = "sign-in-btn" style = {{display: "none"}} />
                <label htmlFor = "sign-in-btn">
                    <Button
                        className = {classes.btn}
                        variant = "outlined"
                        component = "span"
                    >
                        <b>Login</b>
                    </Button>
                </label>
                <Typography variant = "inherit" style = {{marginTop: "120px"}}>Don't have any account?</Typography>
            </form>
        </div>
    )
}

export default Signin
