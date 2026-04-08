import express from 'express'
import { addComment, getCommentbyPostId, getCommentforpaging, getMyPostComments } from '../controllers/commentController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router()
router.post('/addcomment/:postId',isAuthenticated,addComment)
router.get('/comments/:postId',getCommentbyPostId)
router.get('/comments/pagination/:postId',getCommentforpaging)
router.get('/allpostcomment/usercomment',isAuthenticated,getMyPostComments)

export default router;