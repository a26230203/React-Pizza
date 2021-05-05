import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
class App extends Component {
  state = {
    pizzas: [],
    editPizza: {},
  };

  //Require Date from backend. 
  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then((res) => res.json())
      .then((pizzas) => this.setState({ pizzas }))
  }

  //Select pizza once edit button click
  selectPizza = (singlePizza) => {
    this.setState(
      {
        editPizza: singlePizza
      }
    )
  }
 
  //Change the input value 
  changeHandler = (e) => {
    this.setState({
      editPizza: {
        ...this.state.editPizza,
        [e.target.name]: e.target.value,
      }
    })
  }

  //Change Vegetarian
  updatedVegetarian = () => {
    this.setState({
      editPizza: {
        ...this.state.editPizza,
        vegetarian: !this.state.editPizza.vegetarian
      }
  })
} 

  //Subumit the edit
  handleSubmit = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`, {
      method: 'PATCH',
      headers:{
        "Content-Type": 'application/json',
        "Accept": 'application/json',
      },
      body: JSON.stringify(this.state.editPizza)
    })
      .then(res=> res.json())
        .then(() => {
          this.setState({
            pizzas: this.state.pizzas.map(p => p.id === this.state.editPizza.id ? this.state.editPizza : p)
          })
        })
  }

  render() {
    console.log(this.state.editPizza);
    return (
      <Fragment>
        <Header />
        {Object.keys(this.state.editPizza).length > 0 ? (
          <PizzaForm
            selectedPizza={this.state.editPizza}
            updatedVegetarian={this.updatedVegetarian}
            changeHandler={this.changeHandler}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
        <PizzaList
          pizza={this.state.pizzas}
          selectPizza={this.selectPizza}
        />
      </Fragment>
    )
  }
}
export default App;