import React from 'react';
import firebase from '../../firebaseConfig';
import Button from '../../Button'
import './Salao.css'

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

const products = [
    {
      name: "CAFÉ AMERICANO",
      price: 5,
    },
    {
      name: "CAFÉ COM LEITE",
      price: 7,
    },
    {
      name: "SANDUÍCHE DE PRESUNTO E QUEIJO",
      price: 10,
    },
    {
      name: "SUCO DE FRUTA NATURAL",
      price: 7,
    },
    {
      name: "HAMBÚRGUER SIMPLES",
      price: 10,
    },
    {
      name: "HAMBÚRGUER DUPLO",
      price: 15,
    },
    {
      name: "BATATA FRITA",
      price: 5,
    },
    {
      name: "ANÉIS DE CEBOLA",
      price: 5,
    },
    {
      name: "ÁGUA 500ml",
      price: 5,
    },
    {
      name: "ÁGUA 750ml",
      price: 7,
    },
    {
      name: "BEBIDA GASEIFICADA 500ml",
      price: 7,
    },
    {
      name: "BEBIDA GASEIFICADA 750ml",
      price: 10,
    }
  ];

class Salao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buy: [],
            client: "",
            atendentName: ""
        };
    }

    handleChange = (event, element, value) => {
      const newState = this.state;
      event ? newState[element] = event.target.value : newState[element] = value;
      this.setState(newState);
    }

    buyClick = (item) => {
        const itemIndex = this.state.buy.findIndex((product) => {
            return product.name === item.name;
        })
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quant: 1
            };
            this.setState({
                buy: this.state.buy.concat(newItem)
            });
        } else {
            let newBuy = this.state.buy;
            newBuy[itemIndex].quant += 1;
            this.setState({
                buy: newBuy
            });
        }
    }
    
    deleteClick = (item) => {
      const itemIndex = this.state.buy.findIndex((product) => {
        return product.productName === item.productName;
      });
      
      let newQuantity = this.state.buy;
      newQuantity[itemIndex].quantity -= 1;
      const quantity = newQuantity[itemIndex].quantity;
      
      if (quantity > 0) {
        this.setState({
          buy: newQuantity
        });
      } else {
        newQuantity.splice(itemIndex, 1);
        this.setState({
          buy: newQuantity
        })
      }
    }

    sendOrder = () => {
      let userId = firebaseAppAuth.currentUser.uid;
      database.collection("users").doc(userId).get()
        .then((doc) => {
          this.handleChange(undefined, "atendentName", doc.data().nome);
        })
        .then(() => {
          database.collection("orders").doc().set({
            clientName: this.state.client,
            atendentName: this.state.atendentName,
            order: this.state.buy,
          }, {
            merge: true
          })
        })
        .then(() => {
          this.handleChange(undefined, "buy", []);
          this.handleChange(undefined, "client", "");
        })
    }

    render() {
        const total = this.state.buy.reduce((acc, cur) => {
            return acc + (cur.quant * cur.price)
        }, 0);
        return (
            <React.Fragment>
              <div className="container d-flex">
                  <div className="row orders d-flex flex-column col-sm-6 p-5">
                  {
                      products.map((product, i) => {
                          return <div key={i}>
                          <button className="product p-2 m-1" onClick={() => this.buyClick(product)}>
                          {product.name}</button>
                          </div>
                      })
                  }
                  </div>
                  <div className="row orders d-flex flex-column col-sm-6">
                  {
                      this.state.buy.map((product, i) => {
                          return <div key={i} className="d-flex">
                          <p>{product.name}</p>
                          <p>Preço: {product.price * product.quant}</p>
                          <p>Quantidade: {product.quant}</p>
                          <button className="Transparent-bg" onClick={() => this.deleteClick(product)}>
                          Excluir
                          </button>
                          </div>
                      })
                  }
                  { 
                    <section className="p-5">
                      <input placeholder="Nome do Cliente" value={this.state.client}
                          onChange={(e) => this.handleChange(e, "client")}></input>
                      <p>Valor total = {total}</p>
                      <Button text="FECHAR PEDIDO" onClick={this.sendOrder} />
                    </section>
                  }
                  </div>
                  </div>
            </React.Fragment>
        )
    }
}

export default Salao;