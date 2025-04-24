import React, { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils/"; // bcz of the default behaviour of export

const SideNav = (props) => {
  const { selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideMenu } =
    props;
  const [searchValue, setSearchValue] = useState("");
  const filteredPokemon = first151Pokemon.filter((val, valIndex) => {
    if (getFullPokedexNumber(valIndex).includes(searchValue)) return true;
    if (val.toLowerCase().includes(searchValue.toLowerCase())) return true;

    return false;
  });

  return (
    <nav className={" " + (!showSideMenu ? "open" : "")}>
      <div className={"header" + (!showSideMenu ? " open" : "")}>
        <button onClick={handleToggleMenu} className="open-nav-button">
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="text-gradient">PokeDex</h1>
      </div>
      <input
        placeholder="e.g. 001 or bulba"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        const truePokemon = first151Pokemon.indexOf(pokemon);
        return (
          <button
            onClick={() => {
              setSelectedPokemon(truePokemon);
              handleToggleMenu();
            }}
            key={pokemonIndex}
            className={
              "nav-card" +
              (pokemonIndex === selectedPokemon ? " nav-card-selected" : "")
            }
          >
            <p>{getFullPokedexNumber(truePokemon)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
};

export default SideNav;
