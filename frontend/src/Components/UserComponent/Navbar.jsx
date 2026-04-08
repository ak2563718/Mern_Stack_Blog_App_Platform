import { Link, useNavigate } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";
import { motion } from "motion/react";
import { Search, BookOpen, Calendar, User, ArrowRight, Menu, X ,Settings ,LogOut} from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, sessionUser } from "@/redux/actions/userAction";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Loader from "./Loader";
import { getProfile } from "@/redux/actions/profileAction";

export default function Navbar() {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const { user , islogin , message , error , loading }= useSelector((state) => state.user)
  const { profile } = useSelector((state)=>state.profile)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(sessionUser())
  } ,[])

  useEffect(()=>{
    dispatch(getProfile())
  },[islogin])

  const onLogout=()=>{
      dispatch(logoutUser())
  }


  return (
    <div>
     {/* Header */}
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">BlogHub</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/category" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              {/* <Link to="/login">
                <Button>Get Started</Button>
              </Link> */}
            </div>
             <div className="hidden md:flex items-center gap-4">
            {!islogin ? (
              <Button onClick={()=>navigate('/login')}>Get Started</Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={profile.profileImage?.secure_url} alt={user.name} />
                      <AvatarFallback>
                        {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>navigate('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span >Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  { user.role === 'Admin' && 
                  <>
                   <DropdownMenuItem onClick={()=>navigate('/admin')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Admin-Page</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                    </>
                  }
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>


            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <div className="flex gap-2">
                <Link to="/login" className="flex-1">
                  <Button variant="ghost" className="w-full">Login</Button>
                </Link>
              </div>

              {/* Auth Section */}
         
          </div>
          )}
        </nav>
      </header>
    </div>
  );
}
