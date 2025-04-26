namespace PokemonAPI.Models
{
    public class Pokemon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string? BaseEvolution { get; set; }
        public string? NextEvolution { get; set; }
        public int Generation { get; set; }
    }
}
