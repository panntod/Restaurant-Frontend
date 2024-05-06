import React from 'react'
import { H4, P } from './Text'
import { API_URL } from '../utils/auth'

function Card({ data }: { data: any }) {
    const [count, setCount] = React.useState(0);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
    });

    function getCart() {
        const storage = localStorage.getItem("cart");

        const cart = storage ? JSON.parse(storage) : [];
        const indexCart = cart.findIndex((item: any) => item.id == data.id);
        if (indexCart != -1) {
            setCount(cart[indexCart].count);
        }
    }

    React.useEffect(() => {
        getCart()
    }, [])

    function updateCart(id: number, type: "increase" | "decrease") {
        const storage = localStorage.getItem("cart");
        if (!storage) localStorage.setItem("cart", "[]");

        const cart = storage ? JSON.parse(storage) : [];
        const indexCart = cart.findIndex((item: any) => item.id == id);

        if (indexCart == -1 && type == "increase") {
            cart.push({
                id,
                count: 1
            })
            setCount(count + 1);
        } else if (indexCart != -1) {
            if (type == "increase") {
                cart[indexCart].count++;
                setCount(count + 1);
            } else {
                if (count <= 0) return;
                cart[indexCart].count--;
                setCount(count - 1);
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <figure className='w-96 h-60 rounded-t-lg overflow-hidden'>
                <img className="w-full" src={`${API_URL}/uploaded/${data.image}`} alt="" />
            </figure>
            <div className="p-5">
                <a href="#">
                    <H4>{data.name}</H4>
                </a>
                <P>{data.spicy_level}</P>
                <P>{formatter.format(data.price)}</P>
                <div className="flex justify-end items-center gap-4">
                    <button onClick={() => updateCart(data.id, "decrease")} className="w-8 h-8 font-semibold rounded-full bg-red-500 hover:bg-red-400">-</button>
                    {count}
                    <button onClick={() => updateCart(data.id, "increase")} className="w-8 h-8 font-semibold rounded-full bg-green-600 hover:bg-green-500">+</button>
                </div>
            </div>
        </div>

    )
}

export default Card
