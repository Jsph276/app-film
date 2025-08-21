// ===== CONFIGURATION DE L'API TMDb =====
const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77'; // Clé API TMDb
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// ===== ÉLÉMENTS DOM =====
const elements = {
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    sortSelect: document.getElementById('sort-select'),
    genreSelect: document.getElementById('genre-select'),
    moviesGrid: document.getElementById('movies-grid'),
    loadingSpinner: document.getElementById('loading-spinner'),
    errorMessage: document.getElementById('error-message'),
    errorText: document.getElementById('error-text'),
    noResults: document.getElementById('no-results'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    themeText: document.getElementById('theme-text'),
    mainTitle: document.getElementById('main-title')
};

// ===== ÉTAT GLOBAL DE L'APPLICATION =====
let appState = {
    currentTheme: 'dark',
    currentMovies: [],
    currentSearch: '',
    currentGenre: '',
    currentSort: 'popularity'
};

// ===== GESTIONNAIRE D'ÉVÉNEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Charger le thème sauvegardé ou utiliser le thème par défaut
    loadTheme();
    
    // Charger les films populaires au démarrage
    loadPopularMovies();
}

function setupEventListeners() {
    // Recherche
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filtres
    elements.sortSelect.addEventListener('change', handleSortChange);
    elements.genreSelect.addEventListener('change', handleGenreChange);
    
    // Changement de thème
    elements.themeToggle.addEventListener('click', toggleTheme);
}

// ===== GESTION DE L'API TMDb =====
async function fetchMovies(endpoint, params = {}) {
    try {
        const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
        url.searchParams.append('api_key', TMDB_API_KEY);
        url.searchParams.append('language', 'fr-FR');
        
        // Ajouter les paramètres
        Object.keys(params).forEach(key => {
            if (params[key] !== '' && params[key] !== null) {
                url.searchParams.append(key, params[key]);
            }
        });
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        throw error;
    }
}

async function loadPopularMovies() {
    try {
        showLoading(true);
        hideMessages();
        
        const data = await fetchMovies('/movie/popular', {
            page: 1
        });
        
        appState.currentMovies = data.results;
        displayMovies(data.results);
        
    } catch (error) {
        showError('Erreur lors du chargement des films populaires');
    } finally {
        showLoading(false);
    }
}

async function searchMovies(query) {
    try {
        showLoading(true);
        hideMessages();
        
        const data = await fetchMovies('/search/movie', {
            query: query,
            page: 1
        });
        
        appState.currentMovies = data.results;
        appState.currentSearch = query;
        
        if (data.results.length === 0) {
            showNoResults();
        } else {
            displayMovies(data.results);
        }
        
    } catch (error) {
        showError('Erreur lors de la recherche');
    } finally {
        showLoading(false);
    }
}

// ===== AFFICHAGE DES FILMS =====
function displayMovies(movies) {
    if (!movies || movies.length === 0) {
        showNoResults();
        return;
    }
    
    const moviesHTML = movies.map(movie => createMovieCard(movie)).join('');
    elements.moviesGrid.innerHTML = moviesHTML;
    
    // Ajouter l'effet de fondu sur les cartes
    setTimeout(() => {
        const cards = document.querySelectorAll('.movie-card');
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 100);
}

function createMovieCard(movie) {
    const posterPath = movie.poster_path 
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/300x450/666666/ffffff?text=Aucune+image';
    
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const stars = generateStars(movie.vote_average);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const genre = getGenreName(movie.genre_ids[0]);
    
    return `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="movie-card">
                <img src="${posterPath}" 
                     alt="${movie.title}" 
                     class="movie-poster"
                     onerror="this.src='https://via.placeholder.com/300x450/666666/ffffff?text=Erreur+image'">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-rating">
                        <span class="rating-stars">${stars}</span>
                        <span class="rating-value">${rating}</span>
                    </div>
                    <span class="movie-genre">${genre}</span>
                    <div class="movie-year">${year}</div>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    if (!rating) return '☆☆☆☆☆';
    
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}

function getGenreName(genreId) {
    const genres = {
        28: 'Action', 12: 'Aventure', 16: 'Animation', 35: 'Comédie',
        80: 'Crime', 99: 'Documentaire', 18: 'Drame', 10751: 'Famille',
        14: 'Fantasy', 36: 'Histoire', 27: 'Horreur', 10402: 'Musique',
        9648: 'Mystère', 10749: 'Romance', 878: 'Science-Fiction',
        10770: 'Téléfilm', 53: 'Thriller', 10752: 'Guerre', 37: 'Western'
    };
    
    return genres[genreId] || 'Autre';
}

// ===== GESTION DES RECHERCHES ET FILTRES =====
function handleSearch() {
    const query = elements.searchInput.value.trim();
    
    if (query === '') {
        loadPopularMovies();
        return;
    }
    
    searchMovies(query);
}

function handleSortChange() {
    const sortBy = elements.sortSelect.value;
    appState.currentSort = sortBy;
    
    if (appState.currentMovies.length > 0) {
        const sortedMovies = sortMovies(appState.currentMovies, sortBy);
        displayMovies(sortedMovies);
    }
}

function handleGenreChange() {
    const genreId = elements.genreSelect.value;
    appState.currentGenre = genreId;
    
    if (genreId === '') {
        // Afficher tous les films
        if (appState.currentSearch) {
            searchMovies(appState.currentSearch);
        } else {
            loadPopularMovies();
        }
    } else {
        // Filtrer par genre
        filterMoviesByGenre(genreId);
    }
}

function sortMovies(movies, sortBy) {
    const sortedMovies = [...movies];
    
    switch (sortBy) {
        case 'rating':
            return sortedMovies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        case 'date':
            return sortedMovies.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
        case 'popularity':
        default:
            return sortedMovies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
}

async function filterMoviesByGenre(genreId) {
    try {
        showLoading(true);
        hideMessages();
        
        const data = await fetchMovies('/discover/movie', {
            with_genres: genreId,
            sort_by: appState.currentSort === 'rating' ? 'vote_average.desc' : 'popularity.desc',
            page: 1
        });
        
        appState.currentMovies = data.results;
        
        if (data.results.length === 0) {
            showNoResults();
        } else {
            displayMovies(data.results);
        }
        
    } catch (error) {
        showError('Erreur lors du filtrage par genre');
    } finally {
        showLoading(false);
    }
}

// ===== GESTION DU THÈME =====
function toggleTheme() {
    const newTheme = appState.currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    appState.currentTheme = theme;
    
    // Mettre à jour les classes CSS
    document.body.className = `theme-${theme}`;
    
    // Mettre à jour l'interface
    updateThemeUI(theme);
    
    // Sauvegarder le thème
    localStorage.setItem('vibeflix-theme', theme);
}

function updateThemeUI(theme) {
    if (theme === 'light') {
        elements.themeIcon.textContent = '☀️';
        elements.themeText.textContent = 'Mode Clair';
    } else {
        elements.themeIcon.textContent = '🌙';
        elements.themeText.textContent = 'Mode Sombre';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('vibeflix-theme') || 'dark';
    setTheme(savedTheme);
}

// ===== GESTION DE L'INTERFACE UTILISATEUR =====
function showLoading(show) {
    if (show) {
        elements.loadingSpinner.classList.remove('d-none');
        elements.moviesGrid.innerHTML = '';
    } else {
        elements.loadingSpinner.classList.add('d-none');
    }
}

function showError(message) {
    elements.errorText.textContent = message;
    elements.errorMessage.classList.remove('d-none');
    elements.moviesGrid.innerHTML = '';
}

function showNoResults() {
    elements.noResults.classList.remove('d-none');
    elements.moviesGrid.innerHTML = '';
}

function hideMessages() {
    elements.errorMessage.classList.add('d-none');
    elements.noResults.classList.add('d-none');
}

// ===== UTILITAIRES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== GESTION DES ERREURS GLOBALES =====
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    showError('Une erreur inattendue s\'est produite');
});

// ===== OPTIMISATION DES PERFORMANCES =====
// Recherche avec debounce pour éviter trop d'appels API
const debouncedSearch = debounce(handleSearch, 500);

// Ajouter un écouteur pour la recherche en temps réel (optionnel)
elements.searchInput.addEventListener('input', function() {
    if (this.value.trim().length > 2) {
        debouncedSearch();
    }
});

// ===== GESTION DE LA NAVIGATION AU CLAVIER =====
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K pour focus sur la recherche
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        elements.searchInput.focus();
    }
    
    // Échap pour effacer la recherche
    if (e.key === 'Escape') {
        elements.searchInput.value = '';
        elements.searchInput.blur();
        loadPopularMovies();
    }
});

// ===== GESTION DU SCROLL INFINI (OPTIONNEL) =====
let isLoadingMore = false;
let currentPage = 1;

window.addEventListener('scroll', debounce(function() {
    if (isLoadingMore) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollTop + windowHeight >= documentHeight - 100) {
        loadMoreMovies();
    }
}, 100));

async function loadMoreMovies() {
    if (isLoadingMore) return;
    
    try {
        isLoadingMore = true;
        currentPage++;
        
        let endpoint = '/movie/popular';
        let params = { page: currentPage };
        
        if (appState.currentSearch) {
            endpoint = '/search/movie';
            params.query = appState.currentSearch;
        } else if (appState.currentGenre) {
            endpoint = '/discover/movie';
            params.with_genres = appState.currentGenre;
        }
        
        const data = await fetchMovies(endpoint, params);
        
        if (data.results && data.results.length > 0) {
            appState.currentMovies = [...appState.currentMovies, ...data.results];
            appendMovies(data.results);
        }
        
    } catch (error) {
        console.error('Erreur lors du chargement de plus de films:', error);
        currentPage--;
    } finally {
        isLoadingMore = false;
    }
}

function appendMovies(movies) {
    const moviesHTML = movies.map(movie => createMovieCard(movie)).join('');
    elements.moviesGrid.insertAdjacentHTML('beforeend', moviesHTML);
}
