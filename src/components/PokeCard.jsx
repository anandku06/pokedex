import React, { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";

const PokeCard = (props) => {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const baseURL = `https://pokeapi.co/api/v2/pokemon/${getPokedexNumber(
          selectedPokemon
        )}/`;
        // const baseURL = `https://pokeapi.co/api/v2/pokemon/`;

        const res = await fetch(baseURL);
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

  return <div></div>;
};

export default PokeCard;
