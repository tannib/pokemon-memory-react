import styles from './Card.module.scss'

interface CardProps {
  p: {
    img: string
    id: number
    isFound: boolean;
    isTurned: boolean;
  }
  idx: number
  setNumbersOfClicked: React.Dispatch<React.SetStateAction<0 | 2 | 1>>
  numbersOfClicked: 0 | 1 | 2
  setIdxClicked: React.Dispatch<React.SetStateAction<number | undefined>>
  idxClicked: number | undefined
  setIdPokemonClicked: React.Dispatch<React.SetStateAction<number | undefined>>
  idPokemonClicked: number | undefined
  setIdsArrayFound: React.Dispatch<React.SetStateAction<number[]>>
  idsArrayFound: number[]
  setIdsArrayClicked: React.Dispatch<React.SetStateAction<number[]>>
  idsArrayClicked: number[]
  setMoves: React.Dispatch<React.SetStateAction<number>>
}

const Card = ({
  p,
  idx,
  setNumbersOfClicked,
  numbersOfClicked,
  setIdxClicked,
  idxClicked,
  setIdPokemonClicked,
  idPokemonClicked,
  setIdsArrayFound,
  idsArrayFound,
  setIdsArrayClicked,
  idsArrayClicked,
  setMoves
}: CardProps) => {

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => {
    if (numbersOfClicked === 2) return null
    if(idx === idxClicked) return null

    if (numbersOfClicked === 0) {
      setNumbersOfClicked(1)
      setIdPokemonClicked(+(e.target as Element).id)
      setIdsArrayClicked([...idsArrayClicked, idx])
    }

    if (numbersOfClicked === 1) {
      setNumbersOfClicked(2)
      if(idPokemonClicked === +(e.target as Element).id) {
        setNumbersOfClicked(0)
        setIdsArrayFound([...idsArrayFound, idPokemonClicked]);
        setIdxClicked(undefined)
        setIdsArrayClicked([])
        setMoves((m) => m + 1)
      } else {
        setIdsArrayClicked([...idsArrayClicked, idx])
        setMoves((m) => m + 1)
        setTimeout(() => {
          setIdsArrayClicked([])
          setNumbersOfClicked(0)
          setIdxClicked(undefined)
        }, 500)
      }
    }
    setIdxClicked(idx)
    
  }

  for (let i = 0; i < idsArrayFound.length; i++) {
    if(p.id === idsArrayFound[i]) {
      p = {...p, isFound: true}
    }
  }

  for (let i = 0; i < idsArrayClicked.length; i++) {
    if(idx === idsArrayClicked[i]) {
      p = {...p, isTurned: true}
    }
  }

  // console.log(p);


  

  return (
    <div
      className={p.isFound ? styles.cardFound : p.isTurned ? styles.cardOpen : styles.cardClosed}
      onClick={(e) => handleClick(e, idx)}
      key={idx}
      id={`${p.id}`}
    >
      <img className={styles.img} src={p.img} alt={p.img}></img>
    </div>
  )
}

export default Card
