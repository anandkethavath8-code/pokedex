# Pokémon Explorer

A responsive Pokémon Explorer web application built with React and Tailwind CSS.  
The application uses the PokéAPI to fetch Pokémon data and allows users to search, filter, view details, and manage their favourite Pokémon.

## 🚀 Live Demo

[View Live Project](https://pokedex-cdmv.onrender.com)

## 📸 Features

- 🔍 Search Pokémon by name
- 🎯 Browse Pokémon from PokéAPI
- 🏷️ Filter Pokémon by type
- ❤️ Add and remove Pokémon from favourites
- 💾 Store favourites using Local Storage
- 📋 View detailed Pokémon information
- 🖼️ Display Pokémon images and information
- 🧭 Navigation using React Router
- 📱 Responsive design for desktop and mobile
- ⚡ Fast and interactive React interface

## 🛠️ Technologies Used

- React
- JavaScript
- Tailwind CSS
- React Router
- Lucide React
- PokéAPI
- Local Storage
- Vite

## 📂 Project Structure

```text
pokedex/
│
│
├── src/
│   │
│   ├── components/
│   │   ├── navbar.jsx
│   │   ├── pokemoncards.jsx
│   │   └── types.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Pokemon.jsx
│   │   ├── Details.jsx
│   │   ├── Favourite.jsx
│   │   └── Invalidpage.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
