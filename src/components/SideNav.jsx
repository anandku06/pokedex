import React from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils/"; // bcz of the default behaviour of export

const SideNav = (props) => {
  const { selectedPokemon, setSelectedPokemon } = props;

  return (
    <nav>
      <div className={"header"}>
        <h1 className="text-gradient">PokeDex</h1>
      </div>
      <input />
      {first151Pokemon.map((pokemon, pokemonIndex) => {
        return (
          <button
            onClick={() => {
              setSelectedPokemon(pokemonIndex);
            }}
            key={pokemonIndex}
            className={
              "nav-card" +
              (pokemonIndex === selectedPokemon ? " nav-card-selected" : "")
            }
          >
            <p>{getFullPokedexNumber(pokemonIndex)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
};

export default SideNav;
