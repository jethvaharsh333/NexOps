import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schema/signup-schema";
import FormField from "../../components/common/form-field";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/auth/authSlice';
import { triggerEmailAPI } from '../../redux/auth/authApi';
import { useNavigate } from "react-router-dom";  
import toast from "react-hot-toast";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);

        try{
            dispatch(setUser(data));
            await dispatch(triggerEmailAPI(data.email)).unwrap();
            navigate("/verify-email");
            toast.success("Please checkout your email inbox. The code has been sent.", {
                position: "top-right",
                duration: 4000,
                icon: "📨",
                style: {
                    padding: '15px',
                    display: "flex",
                    rowGap: "3px",
                    justifyContent: "space-between",
                },
            });
            reset();
        }catch(err){
            toast.error("Something went wrong.");
        }
    };

    return (
        <form className="grid grid-cols-1 gap-y-2" onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Username">
                <input
                    {...register("username")}
                    type="text"
                    placeholder="user@123"
                    className="w-full py-2 px-3 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-all duration-200"
                />
                {errors.username && (
                    <div className="text-red-500 text-xs mt-[5px]">{errors.username.message}</div>
                )}
            </FormField>

            <FormField label="Email">
                <input
                    {...register("email")}
                    type="text"
                    placeholder="user@gmail.com"
                    className="w-full py-2 px-3 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-all duration-200"
                />
                {errors.email && (
                    <div className="text-red-500 text-xs mt-[5px]">{errors.email.message}</div>
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

            <Button disabled={loading} type="submit" className="bg-black hover:bg-opacity-95">
                <span className="text-white text-sm">{loading ? "Loading..." : "Create an account"}</span>
            </Button>

            {errors.root && <div className="text-red-500 text-xs mt-[-5px]">{errors.root.message}</div>}

            {error && <div className="text-red-500 text-xs mt-[-5px]">{error}</div>}
        </form>
    )
}

export default SignUpForm;