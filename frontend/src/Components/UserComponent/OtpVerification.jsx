import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { BookOpen, ArrowLeft, CheckCircle, RefreshCw, Verified } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { clearmessage } from "@/redux/slices/userSlices";
import { forgetPasswordUser, verifyOtpUser } from "@/redux/actions/userAction";

export default function OtpVerification() {
  const dispatch=useDispatch()
  const { loading , error , message , verifyotp }=useSelector((state) => state.user)
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
 
  useEffect(()=>{
    dispatch(clearmessage())
  },[dispatch])

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef([]);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    dispatch(verifyOtpUser(otpCode))
  };
 
  useEffect(()=>{
    if(verifyotp){
      navigate('/reset-password',{state :{ email }})
    }
  },[verifyotp])

  const handleResend = () => {
    if (resendTimer > 0) return;

    // Mock API call to resend OTP
    setResendTimer(60);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    dispatch(forgetPasswordUser(email))
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">BlogHub</span>
          </Link>
          <p className="text-gray-600">Verify your identity</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Enter Verification Code</CardTitle>
            <CardDescription>
              We've sent a 6-digit code to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="space-y-2">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-14 text-center text-xl font-semibold"
                      disabled={loading}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
        {(error || message) && (
         <p
           className={`mt-3 rounded-md border px-3 py-2 text-sm text-center 
            ${error ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}
        >
          {error || message}
         </p>
          )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Verify Code
                  </>
                )}
              </Button>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-600">
                  Resend code in <strong>{resendTimer}s</strong>
                </p>
              ) : (
                <Button
                  variant="link"
                  onClick={handleResend}
                  className="text-blue-600 gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Resend Code
                </Button>
              )}
            </div>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm text-green-900">
                <strong>Demo Mode:</strong> Use code <strong>123456</strong> to verify
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link to="/forget-password" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Change email address
            </Link>
          </CardFooter>
        </Card>

        {/* Additional Help */}
        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}