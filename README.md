# 🎬 VibeFlix - Application Web de Films

## 📖 Description

VibeFlix est une application web moderne et responsive permettant de découvrir, rechercher et explorer des films via l'API TMDb (The Movie Database). L'application offre une interface utilisateur intuitive avec un design élégant et des fonctionnalités avancées.

## ✨ Fonctionnalités

### 🎯 Fonctionnalités Principales
- **Recherche de films** : Recherche en temps réel par titre
- **Films populaires** : Affichage des films tendance au démarrage
- **Filtrage par genre** : 20 genres de films disponibles
- **Tri intelligent** : Par popularité, note ou date de sortie
- **Thème adaptatif** : Basculement entre mode sombre et clair
- **Interface responsive** : Optimisée pour mobile et desktop

### 🎨 Interface Utilisateur
- **Design moderne** : Interface épurée avec Bootstrap 5
- **Animations fluides** : Effets de survol et transitions douces
- **Cartes de films** : Affichage élégant avec posters, titres et notes
- **Navigation intuitive** : Boutons et contrôles facilement accessibles

### 🔧 Fonctionnalités Techniques
- **Spinner de chargement** : Indicateur visuel pendant les appels API
- **Gestion d'erreurs** : Messages d'erreur informatifs
- **Scroll infini** : Chargement automatique de plus de films
- **Persistance du thème** : Sauvegarde de la préférence utilisateur
- **Recherche optimisée** : Debounce pour éviter les appels API excessifs

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** : Structure sémantique et accessible
- **CSS3** : Styles avancés avec variables CSS et animations
- **Bootstrap 5** : Framework CSS pour la mise en page responsive
- **JavaScript Vanilla** : Logique métier sans dépendances externes

### API et Services
- **TMDb API** : Base de données de films et séries
- **Fetch API** : Appels HTTP modernes et asynchrones

### Fonctionnalités Avancées
- **CSS Variables** : Système de thèmes dynamiques
- **Flexbox/Grid** : Layout responsive moderne
- **Local Storage** : Persistance des préférences utilisateur
- **Debouncing** : Optimisation des performances

## 🚀 Installation et Utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet pour l'API TMDb
- Serveur web local (optionnel, pour le développement)

### Installation

1. **Cloner ou télécharger le projet**
   ```bash
   git clone [url-du-repo]
   cd exo4-vibe
   ```

2. **Ouvrir l'application**
   - Double-cliquer sur `index.html` pour ouvrir dans le navigateur
   - Ou utiliser un serveur local :
     ```bash
     # Avec Python 3
     python -m http.server 8000
     
     # Avec Node.js
     npx serve .
     
     # Avec PHP
     php -S localhost:8000
     ```

3. **Accéder à l'application**
   - Ouvrir `http://localhost:8000` dans votre navigateur

### Utilisation

#### 🔍 Recherche de Films
1. Saisir un titre de film dans la barre de recherche
2. Appuyer sur Entrée ou cliquer sur le bouton "Rechercher"
3. Les résultats s'affichent instantanément

#### 🎭 Filtrage et Tri
1. **Par genre** : Sélectionner un genre dans le menu déroulant
2. **Par critère** : Choisir le mode de tri (popularité, note, date)
3. Les filtres se combinent automatiquement

#### 🌓 Changement de Thème
- Cliquer sur le bouton "Mode Sombre/Clair" en haut à droite
- Le thème est automatiquement sauvegardé
- Transition douce entre les modes

#### ⌨️ Raccourcis Clavier
- **Ctrl/Cmd + K** : Focus sur la barre de recherche
- **Échap** : Effacer la recherche et revenir aux films populaires

## 📱 Responsive Design

L'application s'adapte automatiquement à tous les écrans :

- **Desktop** : Grille 4 colonnes avec tous les contrôles visibles
- **Tablet** : Grille 3 colonnes, bouton de thème repositionné
- **Mobile** : Grille 2 colonnes, interface optimisée tactile

## 🔌 Configuration de l'API

L'application utilise une clé API TMDb intégrée. Pour utiliser votre propre clé :

1. Créer un compte sur [TMDb](https://www.themoviedb.org/)
2. Générer une clé API dans les paramètres
3. Remplacer `TMDB_API_KEY` dans `script.js`

```javascript
const TMDB_API_KEY = 'votre-clé-api-ici';
```

## 🎨 Personnalisation

### Modifier les Couleurs
Les couleurs sont définies dans `styles.css` via des variables CSS :

```css
:root {
    --primary: #007bff;
    --secondary: #6c757d;
    /* ... autres couleurs */
}
```

### Ajouter des Genres
Modifier la fonction `getGenreName()` dans `script.js` :

```javascript
function getGenreName(genreId) {
    const genres = {
        28: 'Action',
        // Ajouter vos genres ici
    };
    return genres[genreId] || 'Autre';
}
```

## 🐛 Dépannage

### Problèmes Courants

1. **Films ne se chargent pas**
   - Vérifier la connexion Internet
   - Contrôler la console du navigateur pour les erreurs

2. **Recherche ne fonctionne pas**
   - S'assurer que la clé API TMDb est valide
   - Vérifier les restrictions CORS

3. **Thème ne change pas**
   - Vérifier que JavaScript est activé
   - Contrôler le localStorage dans les outils de développement

### Console de Développement
Ouvrir F12 pour accéder aux outils de développement et vérifier :
- Onglet Console pour les erreurs JavaScript
- Onglet Network pour les appels API
- Onglet Application pour le localStorage

## 📊 Performance

### Optimisations Implémentées
- **Debouncing** : Recherche limitée à 500ms
- **Lazy Loading** : Chargement progressif des images
- **Scroll Infini** : Chargement à la demande
- **Cache Local** : Sauvegarde des préférences utilisateur

### Métriques Recommandées
- **First Contentful Paint** : < 2s
- **Largest Contentful Paint** : < 3s
- **Cumulative Layout Shift** : < 0.1

## 🔒 Sécurité

- **Pas de stockage de données sensibles**
- **Validation des entrées utilisateur**
- **Gestion sécurisée des erreurs API**
- **Pas d'exposition de clés API côté client**

## 🌟 Fonctionnalités Futures

- [ ] Système de favoris
- [ ] Historique des recherches
- [ ] Notifications push
- [ ] Mode hors ligne
- [ ] Partage sur réseaux sociaux
- [ ] Système de recommandations

## 📄 Licence

Ce projet est développé dans le cadre d'un exercice d'apprentissage. L'utilisation de l'API TMDb est soumise aux [conditions d'utilisation de TMDb](https://www.themoviedb.org/documentation/api/terms-of-use).

## 👨‍💻 Développement

### Structure du Projet
```
exo4-vibe/
├── index.html          # Page principale
├── styles.css          # Styles et thèmes
├── script.js           # Logique JavaScript
└── README.md           # Documentation
```

### Standards de Code
- **HTML** : Sémantique et accessible
- **CSS** : Variables CSS et BEM-like
- **JavaScript** : ES6+, async/await, commentaires détaillés

### Tests
- Tester sur différents navigateurs
- Vérifier la responsivité sur divers écrans
- Valider l'accessibilité avec les outils de développement

## 📞 Support

Pour toute question ou problème :
1. Vérifier la documentation ci-dessus
2. Consulter la console du navigateur
3. Vérifier la connectivité réseau
4. Contrôler la validité de la clé API TMDb

---

**VibeFlix** - Découvrez des films incroyables ! 🎬✨
