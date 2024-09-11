import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">MyApp</Link>
        </div>
        <ul className="flex space-x-8 bg-gray-100 p-4 rounded-lg shadow-md">
          <li>
            <Link
              className="text-gray-700 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-600"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-700 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-600"
              to="/cart"
            >
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav