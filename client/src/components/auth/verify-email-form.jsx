import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import OtpInput from "../ui/otp-input";
import { useDispatch, useSelector } from 'react-redux';
import { verifyCode } from "../../redux/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmailForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const { user, verified, loading, error } = useSelector((state) => state.auth);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (verified) {
            toast.success("Successfully created an account!!");
            navigate("/login");
        }
    }, [verified, error, navigate]);


    const handleAutoSubmit = async (otpValue) => {
        try {
            await dispatch(verifyCode({ code: otpValue, user })).unwrap();
        } catch (error) {
            console.log("handleAutoSubmit catch error")
            navigate("/sign-up");
            toast.error(error);
        }
    };

    useEffect(() => {
        if (timer > 0) {
            const time = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(time);
        }
    }, [timer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length === 6) {
            console.log("Manually submitted OTP:", otp);
        }

        try {
            await verifyCode(dispatch, otp, user);
        } catch (error) {
            console.log("handleAutoSubmit catch error")
            navigate("/sign-up");
            toast.error(error);
        }
    };

    const renderButtonText = () => {
        if (timer <= 0) return "Resend OTP ➤";
        if (loading) return "Loading...";
        return "Submit";
    };

    return (
        <form className="w-full grid grid-cols-1 gap-y-5" onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <OtpInput length={6} onOtpChange={setOtp} onAutoSubmit={handleAutoSubmit} />
            </div>
            <Button disabled={loading} type="submit" className="bg-black hover:bg-opacity-95">
                <span className="text-white text-sm">
                    {renderButtonText()}
                </span>
            </Button>
            {timer > 0 &&
                <div className="w-full flex justify-center">
                    <span className="text-xs text-slate-400">Resend OTP in {timer} sec.</span>
                </div>
            }
            {error && <div className="text-red-500 text-xs mt-[-5px]">{error}</div>}
        </form>
    );
};

export default VerifyEmailForm;