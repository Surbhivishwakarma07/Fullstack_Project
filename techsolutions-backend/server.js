const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('Lead_images'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// MongoDB connection - Replace with your Atlas connection string
const MONGODB_URI = 'mongodb+srv://surbhivishraj07:admin123@cluster.mongodb.net/techsolutions?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    designation: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String, required: true }
}, { timestamps: true });

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
}, { timestamps: true });

// Models
const Project = mongoose.model('Project', projectSchema);
const Client = mongoose.model('Client', clientSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes

// Projects Routes
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';
        
        const project = new Project({
            name,
            description,
            image
        });
        
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Clients Routes
app.get('/api/clients', async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/clients', upload.single('image'), async (req, res) => {
    try {
        const { name, description, designation } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';
        
        const client = new Client({
            name,
            description,
            designation,
            image
        });
        
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Contacts Routes
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/contacts', async (req, res) => {
    try {
        const { fullName, email, mobile, city } = req.body;
        
        const contact = new Contact({
            fullName,
            email,
            mobile,
            city
        });
        
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Newsletter Routes
app.get('/api/newsletter', async (req, res) => {
    try {
        const newsletters = await Newsletter.find().sort({ createdAt: -1 });
        res.json(newsletters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if email already exists
        const existingEmail = await Newsletter.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already subscribed' });
        }
        
        const newsletter = new Newsletter({ email });
        await newsletter.save();
        res.status(201).json(newsletter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});