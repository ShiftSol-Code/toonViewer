require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const { fetchWebtoonData } = require('./services/sheetService');

// API Endpoints
app.get('/api/webtoons', async (req, res) => {
    const data = await fetchWebtoonData();
    // Return list with minimal info
    const list = data.map(item => ({
        id: item.id,
        title: item.title,
        author: item.author,
        thumbnail: item.thumbnail
    }));
    res.json(list);
});

app.get('/api/webtoon/:id', async (req, res) => {
    const data = await fetchWebtoonData();
    const item = data.find(w => w.id === req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Webtoon not found' });
    }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/viewer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'viewer.html'));
});

app.listen(port, () => {
  console.log(`Webtoon Viewer app listening at http://localhost:${port}`);
});
