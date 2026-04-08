import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/userAction";
import Loader from "./Loader";
import AuthSuccess from "./Auth-Success";
import AuthError from "./Auth-Error";
import { clearmessage } from "@/redux/slices/userSlices";


export default function Login() {
  const [isOpen,setIsOpen]=useState(false)
  const [isError,setIsError]=useState(false)
  const dispatch=useDispatch()
  const {user,loading,loginsuccess,error,message,islogin}=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    useEffect(()=>{
       dispatch(clearmessage())
      setIsOpen(false)
    },[islogin])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearmessage())
    dispatch(loginUser(formData))
  };

  useEffect(()=>{
      if(loginsuccess){
        setIsOpen(true)
      }
  },[loginsuccess])

  useEffect(()=>{
    if(error){
      setIsError(true)
    }
  },[error])


  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleGooglelogin = ()=>{
    window.location.href = 'https://mern-stack-blog-app-platform.onrender.com/api/google'
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-3 mt-10">
     {loading && <Loader/>}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">BlogHub</span>
          </Link>
          <p className="text-gray-600">Welcome back! Please login to your account.</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    name='email'
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    name='password'
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <Link to="/forget-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid ">
              <Button onClick={handleGooglelogin} variant="outline" type="button">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
        {isOpen && (<AuthSuccess  isOpen={isOpen}
                    onClose={()=>{
                            setIsOpen(false)
                            navigate('/home')
                    }}
                    title="Login Successful"
                    message="Welcome back! You have successfully logged in."
                    actionLabel = "Continue"
                    type = "login"/>)
        
                    
        }
      {isError && (<AuthError isOpen={isError}
                    onClose={()=>setIsError(false)}
                    title='Login Failed'
                    errorMessage={`${error}`}
                    onRetry
                    retryLabel="Try Again"
                    type='Login Failed'
                    
        />)}

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
