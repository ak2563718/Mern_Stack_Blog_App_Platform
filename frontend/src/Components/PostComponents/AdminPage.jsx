import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  LogOut,
  Settings,
  FileText,
  Users,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "@/redux/actions/userAction";
import { deleteuserblog, getallposts, getPostById } from "@/redux/actions/postAction";
import { ViewProfile } from "../Profile/ViewProfile";
import { getfullProfileInfo } from "@/redux/actions/profileAction";


export default function AdminPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const dispatch = useDispatch()
  const { profileinfo } = useSelector((state)=> state.profile);
  const { allblogs } = useSelector((state)=>state.post)

  const [open ,setOpen]= useState(false);
  const [user,setUser]= useState({})

  useEffect(()=>{
    dispatch(getfullProfileInfo())
    dispatch(getallposts())
  },[dispatch])

  const handleLogout = () => {
    // Mock logout
    navigate("/home");
  };

 

    const totalViews = allblogs.reduce((sum, blog) => sum + blog.viewscount, 0);
  const stats = [
    { label: "Total Posts", value: allblogs.length , icon: FileText, color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Total Views", value: totalViews, icon: Eye, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Total Users", value: profileinfo?.length, icon: Users, color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <span className="text-2xl font-bold text-gray-900">BlogHub</span>
                <span className="ml-2 text-sm text-gray-500">Admin</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      A
                    </div>
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Manage your blog posts and users
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>

                {/* Search */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Posts Tab */}
              <TabsContent value="posts" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(allblogs) && allblogs.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate">{post.title}</div>
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-gray-400" />
                              {post.viewscount.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-500">{formatDate(post.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={()=>navigate(`/blog/${post._id}`)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>navigate(`/profile/blog/editblog/${post._id}`)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>dispatch(deleteuserblog(post._id))} className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(profileinfo) &&  profileinfo.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user?.userId?.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user?.userId?.role}</Badge>
                          </TableCell>
                          <TableCell className="text-gray-500">{formatDate(user?.userId?.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={()=>{
                                  setOpen(true)
                                  setUser(user)
                                }}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>dispatch(deleteUser(user?.userId?._id))} className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
        
              </TabsContent>

              <ViewProfile isOpen = {open} onClose={()=>setOpen(false)} user={user}  />
              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Popular Posts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...(allblogs ?? [])]
                          .filter(p => p.status === "published")
                          .sort((a, b) => b.views - a.views)
                          .slice(0, 5)
                          .map((post) => (
                            <div key={post.id} className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{post.title}</p>
                                <p className="text-xs text-gray-500">{post.author}</p>
                              </div>
                              <div className="ml-4 flex items-center gap-1 text-sm text-gray-600">
                                <Eye className="w-4 h-4" />
                                {post.viewscount.toLocaleString()}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Top Authors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...(profileinfo ?? [])]
                          .sort((a, b) => b.posts - a.posts)
                          .slice(0, 5)
                          .map((user) => (
                            <div key={user.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                                  {user.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{user.name}</p>
                                  <p className="text-xs text-gray-500">{user.role}</p>
                                </div>
                              </div>
                              <div className="ml-4 flex items-center gap-1 text-sm text-gray-600">
                                <FileText className="w-4 h-4" />
                                {user.posts}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
