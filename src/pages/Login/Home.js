import React from 'react';
import Button from '../../Button'
import firebase from '../../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Figure from 'react-bootstrap/Figure';
import './Home.css';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      senha: "",
      emailSignUp: "",
      passwordSignUp: "",
      tipo: "cozinha"
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  signIn = () => {
     this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
       .then(() => {
           if (this.props.user) {
             database.collection("users").doc(this.props.user.uid).get()
              .then(resp => {
                const data = resp.data();
                this.props.history.push(`/${data.tipo}`);
              })
            }
        });
  }

  create = () => {
    this.props.history.push("/create");
  }

  render() {
    return (
      <div className = "container">
      <div className = "row">
      < div className = "col-1" > </div>
      < div className = "bg p-5 col-10 d-flex flex-column align-items-center" >
        <Figure>
          <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src="img/icon.png"
          />
        </Figure>
        <input className="input" value={this.state.email}
          placeholder="E-mail"
          onChange={(e) => this.handleChange(e, "email")} />
        <input className="input" value={this.state.senha}
          type="password"
          placeholder="Senha"
          onChange={(e) => this.handleChange(e, "senha")} />
        <Button text="Entrar" onClick={this.signIn} />
        <Button text="Cadastre-se" onClick={this.create} />
      </div>
      < div className = "col-1" > </div>
      </div>
      </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);
