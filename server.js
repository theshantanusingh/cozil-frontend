const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// // Serve static files (CSS, JS, images)
// app.use('/css', express.static(path.join(__dirname, 'src/css')));
// app.use('/js', express.static(path.join(__dirname, 'src/js')));
// app.use('/images', express.static(path.join(__dirname, 'src/images'))); // Optional

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Catch-all for 404
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

app.listen(PORT, () => {
  console.log(`🚀 Cozil frontend running at http://localhost:${PORT}`);
});
