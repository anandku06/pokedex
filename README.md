# 🧩 React Pokedex

A simple and intuitive **React-based Pokedex** application that lets users view stats of selected Pokémon along with detailed information about their moves.

---

## 🚀 Features

- 🔍 Search and select Pokémon from a dropdown or input field.
- 📊 View base stats (HP, Attack, Defense, etc.).
- 🧠 See detailed information about each move (type, power, accuracy, and more).
- 🎨 Clean, responsive UI with smooth transitions.
- 🗃️ Uses the [PokéAPI](https://pokeapi.co/) for real-time Pokémon data.

---

## 🛠️ Tech Stack

- **React** (with hooks)
- **Axios** (for API calls)
- **CSS Modules** or **Styled Components** (based on your preference)
- **PokéAPI** for Pokémon data

---

## 📦 Installation

```bash
git clone https://github.com/anandku06/pokedex.git
cd pokedex
npm install
npm start
```

---

## 📁 Folder Structure

```
react-pokedex/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Modal.jsx
│   │   └── PokeCard.jsx
│   │   └── SideNav.jsx
│   │   └── TypeCard.jsx
│   ├── App.jsx
│   ├── fanta.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🧠 How It Works

1. The user selects a Pokémon.
2. The app fetches Pokémon data from the PokéAPI.
3. Displays base stats like HP, Attack, Defense, Speed, etc.
4. Lists all available moves, and upon selection, shows move details.

---

## 🐞 Known Issues / To-Do

- [ ] Add type filters for Pokémon selection
- [ ] Paginate move lists for Pokémon with many moves
- [ ] Add unit tests with Jest and React Testing Library

---

## 🧑‍💻 Author

- **Anand Kumar**  
  [GitHub](https://github.com/anandku06) | [LinkedIn](https://linkedin.com/in/anand-kumar-023231291)

---

## 🌟 Show Your Support

If you like this project, give it a ⭐ on [GitHub](https://github.com/anandku06/pokedex)!