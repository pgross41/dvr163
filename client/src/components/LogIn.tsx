import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import styles from './LogIn.module.css';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";

export default function SignIn() {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={styles.paper}>

                <Grid container>
                    <Grid item xs>
                        <Avatar className={styles.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography component="h1" variant="h5" display="inline">
                            DVR163 Dashboard Login
                        </Typography>
                    </Grid>
                </Grid>

                <form className={styles.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                    >
                        Log in
                    </Button>
                </form>
            </div>
        </Container>
    );
}
