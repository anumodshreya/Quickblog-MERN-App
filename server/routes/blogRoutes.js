import express from 'express';
import { addBlog, deleteBlogById, getBlogById, getAllBlogs, togglePublish, addComment, getBlogComments, generateContent } from "../controllers/blogController.js";
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog);

// FIX: Change .post to .get for the /all route
blogRouter.get("/all", getAllBlogs); // CORRECTED LINE

blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post("/delete", auth, deleteBlogById);

blogRouter.post('/generate', auth, generateContent);

export default blogRouter;