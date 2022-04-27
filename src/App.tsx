import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import WinModal from './WinModal'

interface Pokemon {
  type: string
  id: number
  img: string
  isFound: boolean
  isTurned: boolean
}

interface PokemonObj {
  types: { type: { name: string } }[]
  id: number
  sprites: { other: { dream_world: { front_default: string } } }
}

const App = () => {
  const [pokemon, setPokemon] = useState<Pokemon[] | []>([])
  // eslint-disable-next-line
  const [cards, setCards] = useState(16)
  const [numbersOfClicked, setNumbersOfClicked] = useState<0 | 1 | 2>(0)
  const [idxClicked, setIdxClicked] = useState<number>()
  const [idPokemonClicked, setIdPokemonClicked] = useState<number>()
  const [moves, setMoves] = useState(0)
  const [idsArrayFound, setIdsArrayFound] = useState<number[]>([])
  const [idsArrayClicked, setIdsArrayClicked] = useState<number[]>([])
  const [gameWon, setGameWon] = useState(false)

  const swap = (array: number[], i: number, j: number) => {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  const shuffleCards = (array: number[]) => {
    const length = array.length
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i)
      const currentIndex = i - 1
      swap(array, currentIndex, randomIndex)
    }
    return array
  }

  const fetchPokemon = async () => {
    setPokemon([])
    const idsArray = Array.from(Array(200).keys())
    const firstHalfPokeIds = shuffleCards(idsArray).slice(0, cards / 2)
    const secondHalfPokeIds = [...firstHalfPokeIds]
    const pokeIds = shuffleCards(firstHalfPokeIds.concat(secondHalfPokeIds))

    const pokemonObj = pokeIds.map(async (id: number) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const pokemon: PokemonObj = await res.json()
      return {
        type: pokemon.types[0].type.name,
        id: pokemon.id,
        img: pokemon.sprites.other.dream_world.front_default,
        isFound: false,
        isTurned: false,
      }
    })

    const pokemons = await Promise.all(pokemonObj)
    setPokemon(pokemons)
    setGameWon(false)
  }

  useEffect(() => {
    fetchPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (idsArrayFound.length === 8) setGameWon(true)
  }, [moves, idsArrayFound])

  return (
    <>
      {gameWon && (
        <WinModal
          moves={moves}
          setNumbersOfClicked={setNumbersOfClicked}
          setIdxClicked={setIdxClicked}
          setIdsArrayFound={setIdsArrayFound}
          setIdsArrayClicked={setIdsArrayClicked}
          setMoves={setMoves}
          setGameWon={setGameWon}
        />
      )}
      <div className={styles.app}>
        <div className={styles.header}>
          <div
            className={styles.retweet}
            onClick={() => {
              setIdsArrayClicked([])
              setNumbersOfClicked(0)
              setIdxClicked(undefined)
              setIdsArrayFound([])
              setMoves(0)
            }}
          >
            <FontAwesomeIcon icon={faRetweet} />
            <p>Restart</p>
          </div>
          <div className={styles.difficulty}></div>
          <p className={styles.moves}>Moves: {`${moves}`}</p>
        </div>
        <div className={styles.container}>
          {pokemon.map((p: Pokemon, idx) => {
            return (
              <Card
                p={p}
                idx={idx}
                setNumbersOfClicked={setNumbersOfClicked}
                numbersOfClicked={numbersOfClicked}
                idxClicked={idxClicked}
                setIdxClicked={setIdxClicked}
                idPokemonClicked={idPokemonClicked}
                setIdPokemonClicked={setIdPokemonClicked}
                setIdsArrayFound={setIdsArrayFound}
                idsArrayFound={idsArrayFound}
                setIdsArrayClicked={setIdsArrayClicked}
                idsArrayClicked={idsArrayClicked}
                setMoves={setMoves}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
