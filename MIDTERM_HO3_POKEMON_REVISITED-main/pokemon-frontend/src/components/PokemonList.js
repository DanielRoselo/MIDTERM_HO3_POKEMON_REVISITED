import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination } from "react-bootstrap";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("http://localhost:5062/api/Pokemon")
      .then((response) => {
        setPokemons(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ color: "white", textAlign: "center" }}>Error: {error}</p>;

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderTypeWithEmoji = (type) => {
    switch (type) {
      case "Water": return "💧 Water";
      case "Fire": return "🔥 Fire";
      case "Grass": return "🌿 Grass";
      case "Electric": return "⚡ Electric";
      case "Psychic": return "🔮 Psychic";
      case "Rock": return "🪨 Rock";
      case "Ground": return "🌍 Ground";
      case "Flying": return "🕊️ Flying";
      case "Bug": return "🐛 Bug";
      case "Normal": return "📦 Normal";
      case "Poison": return "☠️ Poison";
      case "Ghost": return "👻 Ghost";
      case "Dragon": return "🐉 Dragon";
      case "Ice": return "❄️ Ice";
      case "Fighting": return "🥊 Fighting";
      case "Dark": return "🌑 Dark";
      case "Steel": return "⚙️ Steel";
      case "Fairy": return "🧚 Fairy";
      default: return type;
    }
  };

  return (
    <div className="container mt-5">
      <h1
        className="text-center mb-4"
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "2.5em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffcb05",
        }}
      >
        <img
          src="https://img.icons8.com/ios/50/ffcb05/pokeball--v1.png"
          alt="Poké Ball"
          style={{ width: "40px", height: "40px", marginRight: "15px" }}
        />
        Pokémon List
      </h1>

      <Table
        striped
        bordered
        hover
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "0.8em",
          color: "white",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Height 📏</th> {/* NEW Height column in header */}
            <th>Base Evolution</th>
            <th>Next Evolution</th>
            <th>Generation</th>
          </tr>
        </thead>
        <tbody>
          {currentPokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>{pokemon.name}</td>
              <td>{renderTypeWithEmoji(pokemon.type)}</td>
              <td>{pokemon.height ? `${pokemon.height} m` : "N/A"}</td> {/* NEW Height value */}
              <td>{pokemon.baseEvolution || "N/A"}</td>
              <td>{pokemon.nextEvolution || "N/A"}</td>
              <td>{pokemon.generation}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {Array.from({ length: Math.ceil(pokemons.length / pokemonsPerPage) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
            style={{
              backgroundColor: index + 1 === currentPage ? "#ffcb05" : "transparent",
              color: index + 1 === currentPage ? "#0a0a23" : "#ffcb05",
              borderColor: "#ffcb05",
              fontFamily: "'Press Start 2P', cursive",
            }}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PokemonList;
