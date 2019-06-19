import React from 'react';
import Button from '../Button'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Figure from 'react-bootstrap/Figure';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      senha: "",
      tipo: "cozinha"
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
      .then((resp) => {
        const id = resp.user.uid;
        database.collection("users").doc(id).get()
          .then(resp => {
            const data = resp.data();
            this.props.history.push(`/${data.tipo}`);
          })

      });
  }

  create = () => {
    this.props.history.push("/create");
  }

  render() {
    return (
      <div className="App-header">
        <Figure>
          <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src="img/icon.png"
          />
        </Figure>
        <input value={this.state.email}
          placeholder="email"
          onChange={(e) => this.handleChange(e, "email")} />
        <input value={this.state.senha}
          placeholder="senha"
          onChange={(e) => this.handleChange(e, "senha")} />
        <Button text="Login" onClick={this.signIn} />
        <Button text="Cadastre-se" onClick={this.create} />
      </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);
