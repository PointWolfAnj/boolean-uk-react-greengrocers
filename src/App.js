import './styles/reset.css'
import './styles/index.css'
import { useState } from 'react'
import React from 'react'

import initialStoreItems from './Store-items'
import Store from './components/Store.js'
import Cart from './components/Cart.js'

export default function App() {
  const [store, setStore] = useState(initialStoreItems)
  const [cart, setCart] = useState([])

  // making a new array of a cart by adding items
  const addNewItem = item => {
    setCart([...cart, item])
    console.log('hello'.item)
  }

  // updating items
  const onIncreaseClick = target => {
    const updatedQuantity = cart.map(item =>
      item.id === target.id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCart(updatedQuantity)
  }

  // removing items
  const onDecreaseClick = target => {
    if (target.quantity === 1) {
      const updatedQuantity = cart.filter(item => item.id !== target.id)
      setCart(updatedQuantity)
    } else {
      const updatedQuantity = cart.map(item =>
        item.id === target.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      setCart(updatedQuantity)
    }
  }
  
  function addToCart(item) {
    cart.some(element => element.id === item.id)
      ? onIncreaseClick(item)
      : addNewItem(item)
  }

  const total = cart.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0
  )
  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {/* rendering the store */}
          {store.map(items => {
            return <Store addToCart={addToCart} items={items} />
          })}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cart.map(addedItems => {
              return (
                <Cart
                  onDecreaseClick={onDecreaseClick}
                  onIncreaseClick={onIncreaseClick}
                  addedItems={addedItems}
                />
              )
            })}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            
            <span className="total-number">£ {total.toFixed(2)}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
