import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.cart.products);

    // Calculate total price
    const totalSum = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    const vat = totalSum * 0.12; // 12% VAT
    const totalWithVAT = totalSum + vat;

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>
            {
                cartProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            {cartProducts.map(product => 
                                <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                                    <img 
                                        src={product.thumbnail} 
                                        alt={product.name} 
                                        className="w-32 h-32 object-cover mb-4 rounded-md"
                                    />
                                    <h2 className="text-lg font-semibold">{product.name}</h2>
                                    <p className="text-gray-600">${product.price}</p>
                                    <div className="flex items-center justify-between mt-4 w-full">
                                        <button 
                                            className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                                            onClick={() => handleRemoveFromCart(product)}
                                        >
                                            -
                                        </button>
                                        <p className="mx-4 text-lg font-semibold">{product.quantity}</p>
                                        <button 
                                            className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Total and VAT summary */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-2">Summary</h2>
                            <p className="text-lg">Subtotal: <span className="font-semibold">${totalSum.toFixed(2)}</span></p>
                            <p className="text-lg">VAT (12%): <span className="font-semibold">${vat.toFixed(2)}</span></p>
                            <p className="text-lg">Total: <span className="font-semibold">${totalWithVAT.toFixed(2)}</span></p>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )
            }
        </div>
    );
};

export default Cart;