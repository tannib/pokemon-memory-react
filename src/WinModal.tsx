import { useEffect } from 'react'
import styles from './WinModal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'

interface WinModalProps {
  moves: number
  setIdsArrayClicked: React.Dispatch<React.SetStateAction<number[]>>
  setNumbersOfClicked: React.Dispatch<React.SetStateAction<0 | 2 | 1>>
  setIdxClicked: React.Dispatch<React.SetStateAction<number | undefined>>
  setIdsArrayFound: React.Dispatch<React.SetStateAction<number[]>>
  setMoves: React.Dispatch<React.SetStateAction<number>>
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>
}

const WinModal = ({ moves, setIdsArrayClicked, setNumbersOfClicked, setIdxClicked, setIdsArrayFound, setMoves, setGameWon }: WinModalProps) => {
  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.removeProperty('margin')
      document.body.style.removeProperty('height')
      document.body.style.removeProperty('overflow')
    }
  }, [])

  const restart = () => {
    setIdsArrayClicked([])
    setNumbersOfClicked(0)
    setIdxClicked(undefined)
    setIdsArrayFound([])
    setMoves(0)
    setGameWon(false)
  }

  return (
    <div className={styles.winModal}>
      <div className={styles.winModalContainer}>
        <div className={styles.winModalContent}>
          <div className={styles.winModalHeader}>
            <div className={styles.closeBtn} onClick={() => restart()}>x</div>
          </div>
          <div className={styles.winModalBody}>
            <div>Congrats!</div>
            <div>It took you {moves} moves!</div>
              <div
                className={styles.restart}
                onClick={() => restart()}
              >
                <FontAwesomeIcon icon={faRetweet} />
                <p>Start new game</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinModal
