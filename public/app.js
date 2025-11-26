document.addEventListener('DOMContentLoaded', async () => {
    const viewerContent = document.getElementById('viewer-content');
    const episodeTitle = document.getElementById('episode-title');
    const header = document.getElementById('viewer-header');
    const controls = document.getElementById('viewer-controls');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    // Get ID and episode from URL
    const urlParams = new URLSearchParams(window.location.search);
    const webtoonId = urlParams.get('id');
    const episodeNum = urlParams.get('episode') || '1'; // Default to episode 1

    if (!webtoonId) {
        alert('No webtoon ID provided');
        window.location.href = '/';
        return;
    }

    // Initialize
    let currentEpisodeData = null;
    
    try {
        const response = await fetch(`/api/webtoon/${webtoonId}/episode/${episodeNum}`);
        if (!response.ok) throw new Error('Episode not found');
        currentEpisodeData = await response.json();
        loadEpisode(currentEpisodeData);
        updateNavigationButtons(currentEpisodeData);
    } catch (error) {
        console.error(error);
        viewerContent.innerHTML = '<div style="text-align:center; padding:20px;">Failed to load episode.</div>';
    }

    setupInteractions();
    setupNavigationButtons();

    function loadEpisode(data) {
        episodeTitle.textContent = `${data.title} - ${data.episodeTitle}`;
        viewerContent.innerHTML = ''; // Clear loading

        // Parse comma-separated images if string, else assume array
        const images = typeof data.images === 'string' ? data.images.split(',') : data.images;

        images.forEach((src, index) => {
            const img = document.createElement('img');
            // Trim whitespace and quotes from image URL
            img.src = src.trim().replace(/^["']|["']$/g, '');
            img.alt = `Page ${index + 1}`;
            img.className = 'webtoon-image';
            img.loading = 'lazy'; // Native lazy loading
            viewerContent.appendChild(img);
        });
        
        // Scroll to top when new episode loads
        viewerContent.scrollTop = 0;
    }

    function updateNavigationButtons(data) {
        // Update button states
        if (data.hasPrevious) {
            prevBtn.disabled = false;
            prevBtn.classList.remove('disabled');
        } else {
            prevBtn.disabled = true;
            prevBtn.classList.add('disabled');
        }

        if (data.hasNext) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('disabled');
        } else {
            nextBtn.disabled = true;
            nextBtn.classList.add('disabled');
        }
    }

    function setupNavigationButtons() {
        prevBtn.addEventListener('click', () => {
            if (currentEpisodeData && currentEpisodeData.hasPrevious) {
                window.location.href = `/viewer?id=${webtoonId}&episode=${currentEpisodeData.previousEpisode}`;
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentEpisodeData && currentEpisodeData.hasNext) {
                window.location.href = `/viewer?id=${webtoonId}&episode=${currentEpisodeData.nextEpisode}`;
            }
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
