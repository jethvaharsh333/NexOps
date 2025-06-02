import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <div className="text-2xl font-bold text-purple-700">NexChat</div>
            <nav className="space-x-4 text-gray-700 font-medium">
                {/* <a href="#features" className="hover:text-purple-600">Features</a>
                <a href="#pricing" className="hover:text-purple-600">Pricing</a> */}

                <Link to="/login">
                    <span className="hover:text-purple-600">
                        Login
                    </span>
                </Link>
            </nav>
        </header>
    );
}
