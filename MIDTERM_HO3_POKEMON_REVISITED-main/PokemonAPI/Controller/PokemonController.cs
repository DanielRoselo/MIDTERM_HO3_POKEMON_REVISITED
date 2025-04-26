using Microsoft.AspNetCore.Mvc;
using PokemonAPI.Data;
using PokemonAPI.Models;

namespace PokemonAPI.Controller
{
   
        [Route("api/[controller]")]
        [ApiController]
        public class PokemonController : ControllerBase
        {
            private readonly PokemonDbContext _context;

            public PokemonController(PokemonDbContext context)
            {
                _context = context;
            }

            // GET: api/Pokemon
            [HttpGet]
            public IActionResult GetAll()
            {
                var pokemons = _context.Pokemons.ToList();
                return Ok(pokemons);
            }

            // GET: api/Pokemon/{id}
            [HttpGet("{id}")]
            public IActionResult GetById(int id)
            {
                var pokemon = _context.Pokemons.Find(id);
                if (pokemon == null)
                {
                    return NotFound();
                }
                return Ok(pokemon);
            }

            // POST: api/Pokemon
            [HttpPost]
            public IActionResult Create([FromBody] Pokemon pokemon)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Pokemons.Add(pokemon);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetById), new { id = pokemon.Id }, pokemon);
            }

            // PUT: api/Pokemon/{id}
            [HttpPut("{id}")]
            public IActionResult Update(int id, [FromBody] Pokemon pokemon)
            {
                if (id != pokemon.Id)
                {
                    return BadRequest();
                }

                var existingPokemon = _context.Pokemons.Find(id);
                if (existingPokemon == null)
                {
                    return NotFound();
                }

                existingPokemon.Name = pokemon.Name;
                existingPokemon.Type = pokemon.Type;
                existingPokemon.BaseEvolution = pokemon.BaseEvolution;
                existingPokemon.NextEvolution = pokemon.NextEvolution;
                existingPokemon.Generation = pokemon.Generation;

                _context.SaveChanges();
                return NoContent();
            }

            // DELETE: api/Pokemon/{id}
            [HttpDelete("{id}")]
            public IActionResult Delete(int id)
            {
                var pokemon = _context.Pokemons.Find(id);
                if (pokemon == null)
                {
                    return NotFound();
                }

                _context.Pokemons.Remove(pokemon);
                _context.SaveChanges();
                return NoContent();
            }
        }
}
