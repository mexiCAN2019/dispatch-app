import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './../util/react-local-spa';

function Login() {
    const [values, setValues] = useState({ email: '', password: '', passwordError: null, error: null});

    const handleChange = (e, { name, value }) => {
        setValues({...values, [name]: value});
    }

    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // login(values.email, values.password).then(res => {
        //     if(res === 'granted'){
        //         navigate('/');
        //     };
        // }).catch(err => {
        //     setValues({...values, error: err});
        // });
        try{
            const response = await login(values.email, values.password);
            if(response === 'granted'){
                    navigate('/');
            }
        } catch(err){
            setValues({...values, error: err});
        }
    };

    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Grid.Row>
                    <Header as='h2' color='blue' textAlign='center'>
                        Welcome
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='email' value={values.company} name='email' onChange={handleChange} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                value={values.inputPassword}
                                onChange={handleChange}
                            />

                            <Button color='blue' fluid size='large' onClick={() => handleSubmit()}>
                                Login
                            </Button>
                        </Segment>
                        {values.passwordError ? <h5 style={{color: 'red'}}>Incorrect Password</h5> : ''}
                    </Form>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    )
};


export default Login;