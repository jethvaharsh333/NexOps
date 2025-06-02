import { useDispatch, useSelector } from "react-redux";
import FormField from "../common/form-field";
import PopUp from "../ui/popup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import { updateUser } from "../../redux/auth/authApi";
import toast from "react-hot-toast";

const NameFormPopUp = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const { user, verified, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [error, setError] = useState({});

    const validationError = () => {
        const error = {};

        if (!name) {
            error.name = "Name is required";
        }

        return error
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("form data: ", name);

        const validationErrors = validationError();

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
        } else {
            setError({});
            console.log("Form Submitted");
        }

        try {
            await dispatch(updateUser({ name: name })).unwrap();
            toast.success("Name updated");
            onSuccess();
        } catch (err) {
            toast.error("Failed to update name");
        }
    };

    return (
        <PopUp 
            isOpen={isOpen}
            onClose={onClose}
            title="Complete your profile"
            subheading="Please enter your name"
        >
            <form className="grid grid-cols-1 gap-y-2" onSubmit={handleSubmit}>
                <FormField label="Name">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full py-2 px-3 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-all duration-200 "
                    />
                    {error.name && <div className="text-red-500 text-xs mt-[5px]">{error.name}</div>}
                </FormField>
                <Button disabled={loading} type="submit" className="bg-black hover:bg-opacity-95">
                    <span className="text-white text-sm">{loading ? "Loading..." : "Update"}</span>
                </Button>
            </form>
        </PopUp>
    );
}

export default NameFormPopUp;