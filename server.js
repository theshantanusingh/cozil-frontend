const express = require('express');
const path = require('path');
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/html', express.static(path.join(__dirname, 'src/html')));
app.use('/js', express.static(path.join(__dirname, 'src/js')));

// Middleware for logging HTTP requests
app.use(morgan('combined'));

// Routes for serving HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});


app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/chat/chat.html'));
});

app.get('/videochat', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/video/video.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/contact/contact.html'));
});

app.get("/output.css" , (req , res) => {
    res.sendFile(path.join(__dirname , "src/output.css"));
})

// 404 Fallback (for all unknown routes)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname , "src/error.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});