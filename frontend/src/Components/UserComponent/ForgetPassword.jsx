import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen, Mail, ArrowLeft, Send ,RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { clearmessage } from "@/redux/slices/userSlices";
import { forgetPasswordUser } from "@/redux/actions/userAction";


export default function ForgetPassword() {
  const dispatch=useDispatch()
  const { loading , message , error , sentotp }=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");


  useEffect(()=>{
    dispatch(clearmessage())
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(forgetPasswordUser(email))
    
    // Mock API call to send OTP
  };

  useEffect(()=>{
     
    if(sentotp){
        navigate("/verify-otp", { state: { email } });
    }  
  },[sentotp])

  const handleRetry=()=>{
      dispatch(clearmessage())
      setEmail('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">BlogHub</span>
          </Link>
          <p className="text-gray-600">Reset your password</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a verification code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

                 {/* Error or Message will show here */}
              {(error || message) && (
                <p
                 className={`mt-3 rounded-md border px-3 py-2 text-sm text-center 
                 ${error ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}
                >
                {error || message}
                </p>
               )}
              {error &&  <Button
                  variant="link"
                  onClick={handleRetry}
                  className="text-blue-600 gap-2 flex justify-center"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </Button>}
              {/* Submit Button */}
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Verification Code
                  </>
                )}
              </Button>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> You will receive a 6-digit verification code to your email address. 
                Please check your inbox and spam folder.
              </p>
            </div>
          </CardContent>
        
          <CardFooter className="flex flex-col gap-3">
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>

        {/* Additional Help */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
