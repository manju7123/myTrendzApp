import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productPresent = cartList.find(item => item.id === product.id)
    if (productPresent) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === product.id) {
            return {...item, quantity: item.quantity + product.quantity}
          }
          return item
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (id === item.id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (id === item.id) {
          if (item.quantity !== 1) {
            return {...item, quantity: item.quantity - 1}
          }
          this.removeCartItem(id)
        }
        return item
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
