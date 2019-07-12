import React from 'react';
import Button from '../../Button'
import firebase from '../../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Figure from 'react-bootstrap/Figure';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      senha: "",
      tipo: "salao"
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
          database.collection("users").doc(this.props.user.uid).set({
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

  back = () => {
    this.props.history.push("/");
  }

  render() {
    if (this.props.error) {
        alert(this.props.error)
    }
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
          <input value={this.state.nome}
            placeholder="nome"
            onChange={(e) => this.handleChange(e, "nome")} />
          <input value={this.state.email}
            placeholder="email"
            onChange={(e) => this.handleChange(e, "email")} />
          <input type="password" value={this.state.senha}
            placeholder="senha"
            onChange={(e) => this.handleChange(e, "senha")} />
          <select onChange={(e) => this.handleChange(e, "tipo")}>
            <option value="salao"> Salão </option>
            <option value="cozinha">Cozinha</option>    
          </select>
          <Button text="Criar usuário" onClick={this.createUser} />
          <Button text="Voltar" onClick={this.back} />
        </div>
        <div className = "col-1"> </div>
        </div>
        </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Create);
