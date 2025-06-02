import { Link } from "react-router-dom";

const LayoutAuth = ({ children }) => {
    return(
        <div className="h-full relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex items-center justify-center">
            <div className="absolute top-5 left-5">
                <Link to="/">
                    <span className="text-white fido-regular jaguar-jugglers text-3xl">Chatters</span>
                </Link>
            </div>
            {children}
        </div>
    )    
}

export default LayoutAuth;