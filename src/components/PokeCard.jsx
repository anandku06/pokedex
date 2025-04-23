import React, { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";

const PokeCard = (props) => {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name, height, abilities, stats, types, moves, sprites } = data || {};

  const imgLists = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val] || ["versions", "other"].includes(val)) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    // if loading, then exit
    if (loading || !localStorage) return;

    // check if the selected pokemon's info is in the cache or not
    // define cache
    let cache = {};
    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }

    // check if the selected pokemon is in the cache, if not then fetch from the API
    if (selectedPokemon in cache) {
      setData(cache[selectedPokemon]);
      return;
    }

    // passed all the cache checks, now fwtch pokemon

    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseURL = "https://pokeapi.co/api/v2/";
        const pokemonURL = `pokemon/${getPokedexNumber(selectedPokemon)}`;
        const finalURL = baseURL + pokemonURL;

        const res = await fetch(finalURL);
        if (!res.ok) {
          throw new Error("Pokemon not found");
        }
        const pokemonData = await res.json();

        setData(pokemonData);
        console.log(pokemonData);

        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokedex", JSON.stringify(cache));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [selectedPokemon]);

  if (loading || !data) {
    return (
      <div className="poke-card">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="poke-card">
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className="type-container">
        {types.map((typeObj, typeIndex) => {
          return <TypeCard key={typeIndex} type={typeObj?.type?.name} />;
        })}
      </div>
      <img
        src={"/pokemon/" + getFullPokedexNumber(selectedPokemon) + ".png"}
        alt={`${name}-large-img`}
      />
      <div className="img-container">
        {imgLists.map((spriteUrl, spriteIndex) => {
          const imgUrl = sprites[spriteUrl];
          return (
            <img
              key={spriteIndex}
              src={imgUrl}
              alt={`${name}-img-${spriteUrl}`}
            />
          );
        })}
      </div>

      <h3>Stats</h3>
      <div className="stats-card">
        {stats.map((statObj, statIndex) => {
          const { stat, base_stat } = statObj;
          return (
            <div key={statIndex} className="stat-item">
              <p>{stat?.name.replaceAll("-", " ")}</p>
              <h4>{base_stat}</h4>
            </div>
          );
        })}
      </div>

      <h3>Moves</h3>
      <div className="pokemon-move-grid">
        {moves.map((moveObj, moveIndex) => {
          return (
            <button className="button-card pokemon-move" key={moveIndex} onClick={() => {}}>
              <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default PokeCard;
