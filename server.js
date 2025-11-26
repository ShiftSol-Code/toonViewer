require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const { fetchWebtoonData, getWebtoonEpisodes, getEpisode, getWebtoonList } = require('./services/sheetService');

// API Endpoints
app.get('/api/webtoons', async (req, res) => {
    const data = await fetchWebtoonData();
    const list = getWebtoonList(data);
    res.json(list);
});

// Get all episodes for a webtoon
app.get('/api/webtoon/:id/episodes', async (req, res) => {
    const data = await fetchWebtoonData();
    const episodes = getWebtoonEpisodes(data, req.params.id);
    if (episodes.length > 0) {
        res.json(episodes);
    } else {
        res.status(404).json({ error: 'Webtoon not found' });
    }
});

// Get specific episode with navigation info
app.get('/api/webtoon/:id/episode/:episodeNum', async (req, res) => {
    const data = await fetchWebtoonData();
    const { id, episodeNum } = req.params;
    const episode = getEpisode(data, id, episodeNum);
    
    if (episode) {
        const allEpisodes = getWebtoonEpisodes(data, id);
        const currentIndex = allEpisodes.findIndex(ep => ep.episode === episodeNum);
        
        res.json({
            ...episode,
            hasPrevious: currentIndex > 0,
            hasNext: currentIndex < allEpisodes.length - 1,
            previousEpisode: currentIndex > 0 ? allEpisodes[currentIndex - 1].episode : null,
            nextEpisode: currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1].episode : null
        });
    } else {
        res.status(404).json({ error: 'Episode not found' });
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
