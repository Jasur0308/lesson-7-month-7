import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import axios from '../api';
import { useEffect, useState } from "react";

const Home = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios('/products')
            .then(response => {
                console.log(response.data.products);
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart({...product, quantity: 1}));
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Products</h1>
            {
                products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => 
                            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 transition hover:shadow-lg">
                                <img src={product.thumbnail} alt="" />
                                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                                <p className="text-gray-600 mb-4">${product.price}</p>
                                <button 
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading products...</p>
                )
            }
        </div>
    );
}

export default Home;