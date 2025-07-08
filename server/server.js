import express from 'express';
import 'dotenv/config';
import cors from 'cors';
// import { connect } from 'mongoose'; // This import is not needed here if connectDB handles it
import connectDB from './configs/db.js'; // Your database connection
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Ensure dotenv.config() is called if 'dotenv/config' is not sufficient for your setup
// If 'dotenv/config' is working, you don't need dotenv.config() explicitly.

await connectDB() // This is good, ensuring DB connection before starting server

// --- CRITICAL CORS CONFIGURATION FIX ---
// Replace 'https://quickblog-mern-app.vercel.app' with the ACTUAL URL Vercel gave you for your frontend.
// You can find this URL on your Vercel dashboard for the frontend project.
app.use(cors({
    origin: 'https://quickblog-mern-app.vercel.app', // <-- THIS IS THE KEY FIX
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Ensure all HTTP methods your API uses are listed
    credentials: true // Set to true if your frontend sends cookies or authorization headers
}));

app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies (good practice for forms)


//Routes
app.get('/', (req, res) => res.send('API is Working'))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000; // Render will provide its own PORT env var

app.listen(PORT, () => {
    console.log('Server is running on port' + PORT)})

export default app