const axios = require('axios');
const { parse } = require('csv-parse/sync');

// MOCK URL for now. User needs to replace this with their published CSV URL.
// I'll use a mock function to simulate data if the URL is invalid or empty.
const SHEET_URL = process.env.SHEET_URL || ''; 

// Mock data to use until a real sheet is connected
const MOCK_DATA = [
    {
        id: '1',
        title: '너 혼자만 레벨업',
        author: '추공 / 현군',
        thumbnail: 'https://via.placeholder.com/150x200/00dc64/ffffff?text=Level+Up',
        images: 'https://via.placeholder.com/390x600/000000/FFFFFF?text=Cover,https://via.placeholder.com/390x500/333333/FFFFFF?text=Panel+1,https://via.placeholder.com/390x700/555555/FFFFFF?text=Panel+2'
    },
    {
        id: '2',
        title: '협소한 독자 시점',
        author: '싱숑 / 슬리피-C',
        thumbnail: 'https://via.placeholder.com/150x200/333333/ffffff?text=Omniscient',
        images: 'https://via.placeholder.com/390x600/000000/FFFFFF?text=Cover,https://via.placeholder.com/390x500/333333/FFFFFF?text=Panel+1'
    },
    {
        id: '3',
        title: '휴화산의 귀환',
        author: '비가 / LICO',
        thumbnail: 'https://via.placeholder.com/150x200/ff5555/ffffff?text=Volcano',
        images: 'https://via.placeholder.com/390x600/000000/FFFFFF?text=Cover'
    },
    {
        id: '4',
        title: '악마의 탑',
        author: 'SIU',
        thumbnail: 'https://via.placeholder.com/150x200/5555ff/ffffff?text=Tower',
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
        return records;
    } catch (error) {
        console.error('Error fetching sheet data:', error.message);
        return MOCK_DATA; // Fallback to mock data on error
    }
}

module.exports = { fetchWebtoonData };
