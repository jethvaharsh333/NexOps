import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../components/common/form-field";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schema/login-schema";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/auth/authApi";
import toast from "react-hot-toast";
import NameFormPopUp from "./name-form-popup";
import { useState } from "react";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showNameFormPopUp, setNameFormPopUp] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            identifier: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const user = await dispatch(loginUser(data)).unwrap();
            toast.success("LoggedIn succesfully!!");
            if (!user.name || user.name==null || user.name=='') {
                console.log("true");
                setNameFormPopUp(true);
            } else {
                navigate("/dashboard");
            }
            reset();
        } catch (err) {
            toast.error(err);
            setError("root", {
                message: typeof err === "string" ? err : err,
            });
        }
    };

    return (
        <>
            <form className="grid grid-cols-1 gap-y-2" onSubmit={handleSubmit(onSubmit)}>
                <FormField label="Username / Email">
                    <input
                        {...register("identifier")}
                        type="text"
                        placeholder="user@123 / user@gmail.com"
                        className="w-full py-2 px-3 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-all duration-200"
                    />
                    {errors.identifier && (
                        <div className="text-red-500 text-xs mt-[5px]">{errors.identifier.message}</div>
                    )}
                </FormField>

                <FormField label="Password">
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="******"
                        className="w-full py-2 px-3 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-all duration-200 "
                    />
                    {errors.password && (
                        <div className="text-red-500 text-xs mt-[5px]">{errors.password.message}</div>
                    )}
                </FormField>

                <div className="w-full mb-3">
                    <span className="text-xs font-medium text-slate-800 cursor-pointer">Forgot password?</span>
                </div>

                <Button disabled={isSubmitting} type="submit" className="bg-black hover:bg-opacity-95">
                    <span className="text-white text-sm">{isSubmitting ? "Loading..." : "Login"}</span>
                </Button>

                {errors.root && <div className="text-red-500 text-xs mt-[5px]">{errors.root.message}</div>}
            </form>

            {showNameFormPopUp && (
                <NameFormPopUp
                    isOpen={showNameFormPopUp}
                    onClose={() => setNameFormPopUp(false)}
                    onSuccess={() => {
                        setNameFormPopUp(false);
                        console.log("3");
                        navigate("/dashboard");
                        console.log("4");
                    }}
                />
            )}
        </>
    )
}

export default LoginForm;