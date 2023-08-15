import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(item => {
        total += item.price * item.quantity
      })
      return (
        <>
          <div className="summary-container">
            <h1 className="summary-order-total">
              Order Total: <span className="summary-total">Rs {total}/- </span>
            </h1>
            <p className="cart-list-length">{cartList.length} items in cart</p>
            <button type="button" className="checkout-btn d-sm-none">
              Checkout
            </button>
          </div>
          <button type="button" className="checkout-btn d-lg-none">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
