import React, { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils/"; // bcz of the default behaviour of export

const SideNav = (props) => {
  const { selectedPokemon, setSelectedPokemon } = props;
  const [searchValue, setSearchValue] = useState("");
  const filteredPokemon = first151Pokemon.filter((val, valIndex) => {
    if(getFullPokedexNumber(valIndex).includes(searchValue)) return true
    if(val.toLowerCase().includes(searchValue.toLowerCase())) return true

    return false
  })

  return (
    <nav>
      <div className={"header"}>
        <h1 className="text-gradient">PokeDex</h1>
      </div>
      <input placeholder="e.g. 001 or bulba"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        const truePokemon = first151Pokemon.indexOf(pokemon)
        return (
          <button
            onClick={() => {
              setSelectedPokemon(truePokemon);
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
