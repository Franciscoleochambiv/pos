import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';





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




class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      serie: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/blog');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      serie: this.state.serie,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(
      newUser,
      this.props.history, // allows to redirect within this action
    );
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
                Registro de Usuarios 
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>

        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoComplete="name"
            autoFocus
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            
          />

      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="serie"
            label="Serie"
            name="serie"
            autoComplete="serie"      
            value={this.state.serie}
            onChange={this.onChange}
            error={errors.serie}
            
          />




          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
           
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


          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirme Password"
            type="password"
            id="password2"
            autoComplete="current-password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
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
            Sign Up
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/login" variant="body2">
                {"Tiene una Cuenta ? Sign In"}
                
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

// Putting *auth* state inside of property called *auth*,
// *auth* state comes from root reducer
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {registerUser},
)(withRouter(Register));





/*<div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                    Crea tu cuenta DevConnector
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="type"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Este sitio usa Gravatar, así que si desea una imagen de perfil, use un correo electrónico de Gravatar"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4 01579b light-blue darken-2" />
              </form>
            </div>
          </div>
        </div>
      </div>


      */