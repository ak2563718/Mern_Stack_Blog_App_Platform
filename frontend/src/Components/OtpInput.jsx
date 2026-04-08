import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

export function OtpInput({ length = 6, onComplete, onResend }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setIsError(false);

    // Move to next input if current field is filled
    if (element.value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Call onComplete when all fields are filled
    if (newOtp.every((digit) => digit !== "") && index === length - 1) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    // Move to next input on arrow right
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Move to previous input on arrow left
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp([...newOtp, ...new Array(length - newOtp.length).fill("")]);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex].focus();

    // Call onComplete if all fields are filled
    if (pastedData.length === length) {
      onComplete(pastedData);
    }
  };

  const triggerError = () => {
    setIsError(true);
    setOtp(new Array(length).fill(""));
    inputRefs.current[0].focus();
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            animate={
              isError
                ? {
                    x: [-10, 10, -10, 10, 0],
                    borderColor: ["#ef4444", "#ef4444", "#ef4444"],
                  }
                : {}
            }
            transition={{ duration: 0.4 }}
            className={`w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg outline-none transition-all ${
              isError
                ? "border-red-500 bg-red-50"
                : digit
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
          />
        ))}
      </div>

      {isError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm text-center"
        >
          Invalid OTP. Please try again.
        </motion.p>
      )}

      <div className="text-center">
        <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
        <button
          type="button"
          onClick={onResend}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

// Export the trigger error function for parent components
OtpInput.displayName = "OtpInput";
