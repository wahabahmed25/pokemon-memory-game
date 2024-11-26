import { useState, useEffect } from "react";
import Cards from "./cards";




const App = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  const [pokemons, setPokemons] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);


  //fetching api
  useEffect(() => {
    const fetchPokemons = async () => {
      try{
        //get pokemon that we want by ID
        const pokemonIds = [
          373,384,245,144,491,150,
          6,3,146,488,484,493,
        ];
        //map each ID to fetch call
        const pokemonPromises = pokemonIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
        );
        //since im getting multiple pokemon id use Promise.all
        const pokemonData = await Promise.all(pokemonPromises);

        const formattedData = pokemonData.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default
        }));

        setPokemons(formattedData);
        // setIsLoading(false);

      } catch(error){
        console.error("error fetching pokemon: ", error);
        // setIsLoading(false);
      }
    }
    fetchPokemons();

  }, []);

  //randomize order of pokemons

  const shuffledCards = () => {
    const shuffled = [...pokemons];

    //fisher yates shuffle algorithm
    for (let i = shuffled.length - 1; i>0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; //swapping elements
    }

    setPokemons(shuffled); //pokemosn are now shuffled randomly
  }

  //on click handling

  const handCardClick = (id) => {
    shuffledCards(); //randomize on each click

    if(clickedCards.includes(id)) {
      setCurrentScore(0);
      setClickedCards([]);
    }

    else{
      const newScore = currentScore + 1; //updating score
      setCurrentScore(newScore);
      setClickedCards([...clickedCards, id]);
      
      if(newScore>bestScore){ //setting high score
        setBestScore(newScore)
      }
    }


  };

  
  return (
    <>
      <div className="bg-emerald-200 min-h-screen">
        <div className="flex flow-row justify-center gap-4">
          <p className="text-xl font-bold">pokemon memory game</p>
          <p className="text-lg">Current Score: {currentScore}</p>
          <p className="text-lg">HighScore: {bestScore}</p>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4">
          {pokemons.map((pokemon) => (
            <Cards
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              onClick={() => handCardClick(pokemon.id)}

            />
          ))}
        </div>
       

      </div>
    
    </>
);
  

};

export default App
