const axios = require('axios');
const { parse } = require('csv-parse/sync');

// MOCK URL for now. User needs to replace this with their published CSV URL.
// I'll use a mock function to simulate data if the URL is invalid or empty.
const SHEET_URL = process.env.SHEET_URL || ''; 

// Mock data to use until a real sheet is connected
// New structure: each row is an episode
const MOCK_DATA = [
    {
        id: 'levelup',
        title: '너 혼자만 레벨업',
        author: '추공 / 현군',
        thumbnail: 'https://via.placeholder.com/150x200/00dc64/ffffff?text=Level+Up',
        episode: '1',
        episodeTitle: '1화',
        images: 'https://via.placeholder.com/390x600/000000/FFFFFF?text=Ep1-Cover,https://via.placeholder.com/390x500/333333/FFFFFF?text=Ep1-Panel1,https://via.placeholder.com/390x700/555555/FFFFFF?text=Ep1-Panel2'
    },
    {
        id: 'levelup',
        title: '너 혼자만 레벨업',
        author: '추공 / 현군',
        thumbnail: 'https://via.placeholder.com/150x200/00dc64/ffffff?text=Level+Up',
        episode: '2',
        episodeTitle: '2화',
        images: 'https://via.placeholder.com/390x600/111111/FFFFFF?text=Ep2-Cover,https://via.placeholder.com/390x500/444444/FFFFFF?text=Ep2-Panel1'
    },
    {
        id: 'omniscient',
        title: '협소한 독자 시점',
        author: '싱숑 / 슬리피-C',
        thumbnail: 'https://via.placeholder.com/150x200/333333/ffffff?text=Omniscient',
        episode: '1',
        episodeTitle: '1화',
        images: 'https://via.placeholder.com/390x600/000000/FFFFFF?text=Cover,https://via.placeholder.com/390x500/333333/FFFFFF?text=Panel+1'
    },
    {
        id: 'volcano',
        title: '휴화산의 귀환',
        author: '비가 / LICO',
        thumbnail: 'https://via.placeholder.com/150x200/ff5555/ffffff?text=Volcano',
        episode: '1',
        episodeTitle: '1화',
        images: 'https://via.placeholder.com/390x600/000000/FFFFFF?text=Cover'
    },
    {
        id: 'tower',
        title: '악마의 탑',
        author: 'SIU',
        thumbnail: 'https://via.placeholder.com/150x200/5555ff/ffffff?text=Tower',
        episode: '1',
        episodeTitle: '1화',
        images: 'https://via.placeholder.com/390x600/000000/FFFFFF?text=Cover'
    }
];

async function fetchWebtoonData() {
    if (!SHEET_URL) {
        console.log('No SHEET_URL provided, using mock data.');
        return MOCK_DATA;
    }

    try {
        const response = await axios.get(SHEET_URL);
        const records = parse(response.data, {
            columns: true,
            skip_empty_lines: true
        });
        
        // Normalize id and episode to strings for consistent comparison
        return records.map(record => ({
            ...record,
            id: String(record.id),
            episode: String(record.episode)
        }));
    } catch (error) {
        console.error('Error fetching sheet data:', error.message);
        return MOCK_DATA; // Fallback to mock data on error
    }
}

// Get all episodes for a specific webtoon
function getWebtoonEpisodes(data, webtoonId) {
    return data.filter(item => item.id === webtoonId)
        .sort((a, b) => parseInt(a.episode) - parseInt(b.episode));
}

// Get a specific episode
function getEpisode(data, webtoonId, episodeNum) {
    return data.find(item => item.id === webtoonId && item.episode === String(episodeNum));
}

// Get unique webtoons with episode counts
function getWebtoonList(data) {
    const webtoonMap = new Map();
    
    data.forEach(item => {
        if (!webtoonMap.has(item.id)) {
            webtoonMap.set(item.id, {
                id: item.id,
                title: item.title,
                author: item.author,
                thumbnail: item.thumbnail,
                episodeCount: 0
            });
        }
        webtoonMap.get(item.id).episodeCount++;
    });
    
    return Array.from(webtoonMap.values());
}

module.exports = { 
    fetchWebtoonData,
    getWebtoonEpisodes,
    getEpisode,
    getWebtoonList
};
