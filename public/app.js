document.addEventListener('DOMContentLoaded', async () => {
    const viewerContent = document.getElementById('viewer-content');
    const episodeTitle = document.getElementById('episode-title');
    const header = document.getElementById('viewer-header');
    const controls = document.getElementById('viewer-controls');
    
    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const webtoonId = urlParams.get('id');

    if (!webtoonId) {
        alert('No webtoon ID provided');
        window.location.href = '/';
        return;
    }

    // Initialize
    try {
        const response = await fetch(`/api/webtoon/${webtoonId}`);
        if (!response.ok) throw new Error('Webtoon not found');
        const data = await response.json();
        loadEpisode(data);
    } catch (error) {
        console.error(error);
        viewerContent.innerHTML = '<div style="text-align:center; padding:20px;">Failed to load episode.</div>';
    }

    setupInteractions();

    function loadEpisode(data) {
        episodeTitle.textContent = data.title;
        viewerContent.innerHTML = ''; // Clear loading

        // Parse comma-separated images if string, else assume array
        const images = typeof data.images === 'string' ? data.images.split(',') : data.images;

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src.trim();
            img.alt = `Page ${index + 1}`;
            img.className = 'webtoon-image';
            img.loading = 'lazy'; // Native lazy loading
            viewerContent.appendChild(img);
        });
    }

    function setupInteractions() {
        let lastScrollTop = 0;
        let isUIHidden = false;

        // Toggle UI on click
        viewerContent.addEventListener('click', () => {
            isUIHidden = !isUIHidden;
            toggleUI(isUIHidden);
        });

        // Auto-hide UI on scroll down, show on scroll up
        viewerContent.addEventListener('scroll', () => {
            const scrollTop = viewerContent.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                // Scrolling down
                if (!isUIHidden) {
                    isUIHidden = true;
                    toggleUI(true);
                }
            } else if (scrollTop < lastScrollTop) {
                // Scrolling up
                if (isUIHidden) {
                    isUIHidden = false;
                    toggleUI(false);
                }
            }
            lastScrollTop = scrollTop;
        });
    }

    function toggleUI(hide) {
        if (hide) {
            header.classList.add('hidden');
            controls.classList.remove('visible');
        } else {
            header.classList.remove('hidden');
            controls.classList.add('visible');
        }
    }
});
