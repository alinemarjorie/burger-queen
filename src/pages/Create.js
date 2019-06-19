import React from 'react';
import Button from '../Button'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Create extends React.Component {
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

  createUser = () => {
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then(resp => {
        if (resp) {
          const id = resp.user.uid;
          database.collection("users").doc(id).set({
            email: this.state.email,
            nome: this.state.nome,
            tipo: this.state.tipo
          })
          .then(() => {
            this.props.history.push(`/${this.state.tipo}`);
          });
        }
      })
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

  back = () => {
    this.props.history.push("/");
  }

  render() {
    if (this.props.error) {
        alert(this.props.error)
    }
    return (
      <div className="App-header">
        <input value={this.state.nome}
          placeholder="nome"
          onChange={(e) => this.handleChange(e, "nome")} />
        <input value={this.state.email}
          placeholder="email"
          onChange={(e) => this.handleChange(e, "email")} />
        <input value={this.state.senha}
          placeholder="senha"
          onChange={(e) => this.handleChange(e, "senha")} />
        <select onChange={(e) => this.handleChange(e, "tipo")}>
          <option value="cozinha">Cozinha</option>
          <option value="salao">Salão</option>
        </select>
        <Button text="Criar usuário" onClick={this.createUser} />
        <Button text="Voltar" onClick={this.back} />
      </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Create);
