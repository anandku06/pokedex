import React, { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";
import Modal from "./Modal";

const PokeCard = (props) => {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name, height, abilities, stats, types, moves, sprites } = data || {};
  const [skill, setSkill] = useState(null);
  const [loadingSkill, setLoadingSkill] = useState(false)

  const imgLists = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val] || ["versions", "other"].includes(val)) {
      return false;
    }

    return true;
  });

  async function fetchMoveData(move, movesUrl) {
    if(loadingSkill || !localStorage || !movesUrl){ return }

    // check cache for move
    let c = {}
    if(localStorage.getItem('pokemon-moves')){
      c = JSON.parse(localStorage.getItem('pokemon-moves'))
    }

    if(move in c){
      setSkill(c[move])
      console.log("Found move in cache!!")
      return
    }

    try{
      setLoadingSkill(true)
      const res = await fetch(movesUrl)
      const movesData = await res.json()
      console.log("Fetched move from API", movesData)

      const description = movesData?.flavor_text_entries.filter(val => {
        return val.version_group.name = 'firered_leafgreen'
      })[0]?.flavor_text

      const skillData = {
        name : move,
        description
      }
      setSkill(skillData)
      c[move] = skillData
      localStorage.setItem('pokemon-moves', JSON.stringify(c))
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingSkill(false)
    }

  }

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
      console.log("Found the pokemon in cache!!")
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
        console.log("Fetched pokemon data!!");

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
      {skill && (
        <Modal
          handleCloseModal={() => {
            setSkill(null);
          }}
        >
          <div>
            <h6>Name</h6>
            <h2>{skill.name.replaceAll('-', " ")}</h2>
          </div>
          <div>
            <h6>Description</h6>
            <p>{skill.description}</p>
          </div>
        </Modal>
      )}
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
            <button
              className="button-card pokemon-move"
              key={moveIndex}
              onClick={() => 
                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)}
            >
              <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PokeCard;
