import express from 'express'
import { allblogs, blogById, createBlog, deleteblog, getInfiniteBlogs, managelike, manageView, searchblog, searchBlogByCategory, updateblog, userblogs } from '../controllers/blogController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router()
router.post('/addblog',isAuthenticated,createBlog)
router.get('/allblogs',allblogs)
router.get('/userblogs',isAuthenticated,userblogs)
router.get('/blog/:id',blogById)
router.get('/blogs/search',searchblog)
router.get('/blog/like/:blogId',managelike)
router.get('/blog/view/:blogId',manageView)
router.post('/blog/search',searchBlogByCategory)
router.get('/blogs/scroll/infinite',getInfiniteBlogs)
router.delete('/blogs/delete/:blogId',isAuthenticated,deleteblog)
router.patch('/blogs/update/:id',isAuthenticated,updateblog)
export default router;