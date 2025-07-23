const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/html', express.static(path.join(__dirname, 'src/html')));
app.use('/js', express.static(path.join(__dirname, 'src/js')));
// app.use('/output.css', express.static(path.join(__dirname, 'src/output.css')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.get("/output.css" , (req , res) => {
    res.sendFile(path.join(__dirname , "src/output.css"));
})

// 404 Fallback (for all unknown routes)
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});
