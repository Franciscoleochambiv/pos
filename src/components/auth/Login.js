import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';




import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';







class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',      
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/admin');
    }
  }

  
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/admin');
    }
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
      
    };

    this.props.loginUser(userData);
  }


   


  render() {


    const styles = makeStyles({
      paper: {
        marginTop:8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: 1,
        //color: "rgba(255,255,255,.62)",
        backgroundColor: "#d22354",
        color: '#26c6da'
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 1,
      },
      submit: {
        margin: 2,
      },
           
    });    


  
    

    const useStyles = makeStyles(styles);
    //const classes = useStyles();
    const classes = useStyles;
    const { errors } = this.state;
    return (
      
               <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.form} >
                    <Avatar className={classes.avatar} style={{backgroundColor: "#d22354"}}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                            Ingreso Sistema de Facturación 
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                        
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
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="/register" variant="body2">
                            {"No tiene una Cuenta ? Sign Up"}
                            
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                  <Box mt={8}>


                          <Typography variant="body2" color="textSecondary" align="center">
                          {'Copyright © '}
                          <Link color="inherit" href="https://sfsystemblog.herokuapp.com/">
                            Your Website
                          </Link>{' '}
                          {new Date().getFullYear()}
                          {'.'}
                        </Typography>
                    
                  </Box>
                </Container>

    
          
 
          





                
       
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);



/*
<GridContainer>
<Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{ minHeight: '100vh' }}
                >

                  <Grid item xs={3}>
                    
                    <Card>
                    
                          <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Login</h4>            
                          </CardHeader>
                      
                              <h1 style={{alignItems:"center",justify:"center"}} >Log In</h1>
                              <p >Sign in to your DevConnector account</p>
                              <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                  type="email"
                                  placeholder="Email Address"
                                  name="email"
                                  value={this.state.email}
                                  onChange={this.onChange}
                                  error={errors.email}
                                />
                                <TextFieldGroup
                                  type="password"
                                  placeholder="Password"
                                  name="password"
                                  value={this.state.password}
                                  onChange={this.onChange}
                                  error={errors.password}
                                />                
                                <CardFooter>

                              <Button color="primary" type="submit" >Enviar</Button>
                              <Button color="primary" type="button" >Registrar</Button>
                            </CardFooter>

                                
                              </form>
                    </Card>
                  </Grid>      
                </Grid>
             </GridContainer>        

                */