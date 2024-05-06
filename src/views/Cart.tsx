import React from 'react'
import List from '../components/List'
import { Link } from 'react-router-dom'

const Cart = () => {
    return (
        <React.Fragment>
            <Link to="/" className="font-semibold text-lg m-12 hover:text-gray-700">&lt; Choose Menu</Link>
            <div className="flex justify-center min-h-screen">
                <List />
            </div>
        </React.Fragment>
    )
}

export default Cart
