import React from 'react';

const products = [
    {
      name: "CAFÉ AMERICANO",
      price: 5,
      type: "manhã"
    },
    {
      name: "CAFÉ COM LEITE",
      price: 7,
      type: "manhã"
    },
    {
      name: "SANDUÍCHE DE PRESUNTO E QUEIJO",
      price: 10,
      type: "manhã"
    },
    {
      name: "SUCO DE FRUTA NATURAL",
      price: 7,
      type: "manhã"
    },
    {
      name: "HAMBÚRGUER SIMPLES",
      price: 10,
      type: "dia"
    },
    {
      name: "HAMBÚRGUER DUPLO",
      price: 15,
      type: "dia"
    },
    {
      name: "BATATA FRITA",
      price: 5,
      type: "dia"
    },
    {
      name: "ANÉIS DE CEBOLA",
      price: 5,
      type: "dia"
    },
    {
      name: "ÁGUA 500ml",
      price: 5,
      type: "dia"
    },
    {
      name: "ÁGUA 750ml",
      price: 7,
      type: "dia"
    },
    {
      name: "BEBIDA GASEIFICADA 500ml",
      price: 7,
      type: "dia"
    },
    {
      name: "BEBIDA GASEIFICADA 750ml",
      price: 10,
      type: "dia"
    }
  ];

class Salao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buy: []
        };
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

    render() {
        const total = this.state.buy.reduce((acc, cur) => {
            return acc + (cur.quant * cur.price)
        }, 0);
        return (
            <React.Fragment>
                {
                    products.map((product, i) => {
                        return <button key={i} onClick={() => this.buyClick(product)}>
                        {product.name}</button>
                    })
                }
                {
                    this.state.buy.map((product, i) => {
                        return <p key={i}>{product.name} - {product.price * product.quant} - {product.quant}</p>
                    })
                }
                {
                    <p>Valor total = {total}</p>
                }
            </React.Fragment>
        )
    }
}

export default Salao;