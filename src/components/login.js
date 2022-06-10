import React, { useState } from 'react';
import { Card, Box, Toolbar, IconButton, Stack, Container, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './../util/react-local-spa';

function Login() {
    const [values, setValues] = useState({ email: '', password: '', error: null});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try{
            setValues({...values, error: false});
            const response = await login(values.email, values.password);
            if(response === 'granted'){
                    navigate('/');
            }
        } catch(err){
            console.log(err);
            setValues({...values, error: true});
        }
    };

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{height: "90vh"}}>
            <Grid item>
                <Card>
                    <Container>
                        <Stack spacing={3}>
                            <h2>Welcome</h2>
                            <TextField label='email' value={values.email} name="email" onChange={handleChange} />
                            <TextField label='password' value={values.password} name="password" onChange={handleChange} type="password" />
                            <Button varaint="contained" onClick={handleSubmit}>Login</Button>
                        </Stack>
                    </Container>
                </Card>
                    {values.error ? <h5 style={{color: 'red'}}>Incorrect Password or Username</h5> : ''}
            </Grid >
        </Grid>
    )
};


export default Login;