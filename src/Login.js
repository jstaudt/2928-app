import React, { Component } from 'react';
import fire from './config/fire';
import anon from './anon.svg';
import email from './email.svg';

const anonStyle = {
  backgroundImage: `url(${anon})`
};

const emailStyle = {
  backgroundImage: `url(${email})`
};

class Login extends Component {

  constructor(props) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'http://localhost:3000/',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      }
    };

    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.loginAnonymously = this.loginAnonymously.bind(this);
    this.actionCodeSettings = actionCodeSettings;
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.state = {
      email: '',
      password: '',
      signUpOpen: false
    }

    // Confirm the link is a sign-in with email link.
    if (fire.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      fire.auth().signInWithEmailLink(email, window.location.href)
        .then(function() {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch(function() {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  loginAnonymously(e) {
    e.preventDefault();

    this.setState({signUpOpen: false});

    fire.auth().signInAnonymously().catch(function(error) {
      var errorMessage = error.message;

      console.log(errorMessage);
      // ...
    });
  }

  signup(e) {
    e.preventDefault();

    const email = this.state.email;

    fire.auth().sendSignInLinkToEmail(email, this.actionCodeSettings)
    .then(function() {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);

      alert("Thank you for signing up to 29-28.  An sign up link has been sent to your email.");
    })
    .catch(function() {
      // Some error occurred, you can inspect the code: error.code
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignup(e) {
    e.preventDefault();
    this.setState({signUpOpen: true})
  }

  render() {

    return(
      <div className="col-md-12">
        <form className="login-form">
          <div className="col-md-4 login-btn-container" >
            <button onClick={this.loginAnonymously} type="submit" className="login-btn">
              <img src={anon} style={{width: '200px'}} alt="logo" />
            </button>
          </div>
          {this.state.signUpOpen ?
          (<div className="col-md-4 login-btn-container email-input-container">
            <div className="form-group email-input">
              <label htmlFor="inputEmail">email address</label>
              <input type="email" className="form-control" value={this.state.email} onChange={this.handleChange}
              name="email"
              id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small className="form-text text-muted" id="emailHelp">We'll never share your email with anyone else</small>
            </div>
              <button onClick={this.signup} className="btn btn-success signup-btn">Signup</button>
          </div>) :
          (<div className="col-md-4 login-btn-container" >
            <button onClick={this.handleSignup} type="submit" className="login-btn">
              <img src={email} style={{width: '200px'}} alt="logo" />
            </button>
          </div>)}
        </form>
      </div>
    );
  }
}

export default Login;