import { createContext, useContext } from "react";
import useCountdown from "../hooks/useCountDown";

export const CountDownContext = createContext({} as any);

export const SejamCountDownProvider = ({ children }:any) => {
    const [resendOtpMinutes, ResendOtpSeconds, startResendOtp] = useCountdown(120);
    const [validOtpCodeMinutes, validOtpCodeSeconds, startValidOtpCode] = useCountdown(600);
    return (
        <CountDownContext.Provider value={{
            resendOtpMinutes, ResendOtpSeconds, startResendOtp,
            validOtpCodeMinutes, validOtpCodeSeconds, startValidOtpCode
        }}>
            {children}
        </CountDownContext.Provider>
    );
};

export function useSejamCountDownContext() {
    const context = useContext(CountDownContext);

    if (!context) {
        throw new Error("useCountDownContext must be used within a CountDownProvider");
    }
    return context;
}