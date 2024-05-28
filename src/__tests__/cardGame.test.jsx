import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {act} from 'react-dom/test-utils'

const mockCard = vi.fn(({handleClick, children, facedown}) => <div onClick={handleClick} data-testid={`facedown:${facedown}`}>
  {children}
</div>)
vi.mock('../components/card', () => ({default: mockCard}))

import CardGame from '../components/cardGame'

describe('Card Game Component', () => {
  it('should render two cards per text', () => {
    render(<CardGame cardTexts={["banana", "apple"]}/>)
    expect(screen.getAllByText("banana").length).toBe(2)
    expect(screen.getAllByText("apple").length).toBe(2)
  })
  it('should flip one card when that card is clicked', () => {
    render(<CardGame cardTexts={["banana"]}/>)
    expect(screen.getAllByText("banana").length).toBe(2)
    const cards = screen.getAllByText("banana")
    fireEvent.click(cards[0])
    expect(cards[0].getAttribute('data-testid')).toBe('facedown:false')
    expect(cards[1].getAttribute('data-testid')).toBe('facedown:true')
  })
  it('should leave cards faceup when matching cards are clicked', () => {
    render(<CardGame cardTexts={["banana", "apple"]}/>)
    expect(screen.getAllByText("banana").length).toBe(2)
    expect(screen.getAllByText("apple").length).toBe(2)
    const cards = screen.getAllByText("banana")
    fireEvent.click(cards[0])
    fireEvent.click(cards[1])
    act(() => vi.advanceTimersByTime(10 * 1000))
    const faceupCards = screen.getAllByTestId('facedown:false')
    expect(faceupCards.length).toBe(2)
    expect(faceupCards[0].textContent).toBe("banana")
    expect(faceupCards[1].textContent).toBe("banana")
  })
  it('should flip cards facedown when non-matching cards are clicked', () => {
    render(<CardGame cardTexts={["banana", "apple"]}/>)
    expect(screen.getAllByText("banana").length).toBe(2)
    expect(screen.getAllByText("apple").length).toBe(2)
    const [banana] = screen.getAllByText("banana")
    const [apple] = screen.getAllByText("apple")
    fireEvent.click(banana)
    fireEvent.click(apple)
    act(() => vi.advanceTimersByTime(10 * 1000))
    const facedownCards = screen.getAllByTestId('facedown:true')
    expect(facedownCards.length).toBe(4)
  })
  it('should start game when clicking first card', () => {
    const mockStartGame = vi.fn()
    render(<CardGame onGameStart={mockStartGame} cardTexts={["banana"]}/>)
    expect(screen.getAllByText("banana").length).toBe(2)
    fireEvent.click(screen.getAllByText("banana")[0])
    expect(mockStartGame).toHaveBeenCalledTimes(1)
    mockStartGame.mockRestore()
  })
  it('should end game when clicking last card', () => {
    const mockStartGame = vi.fn()
    const mockEndGame = vi.fn()
    render(<CardGame onGameStart={mockStartGame} onGameEnd={mockEndGame} cardTexts={["banana"]}/>)
    expect(screen.getAllByText("banana").length).toBe(2)
    fireEvent.click(screen.getAllByText("banana")[0])
    expect(mockStartGame).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getAllByText("banana")[1])
    expect(mockEndGame).toHaveBeenCalledTimes(1)
    mockStartGame.mockRestore()
    mockEndGame.mockRestore()
  })
  it('should flip all cards facedown when game ends', () => {
    render(<CardGame cardTexts={["banana", "apple"]}/>)
    expect(screen.getAllByText("banana").length).toBe(2)
    expect(screen.getAllByText("apple").length).toBe(2)
    const bananaCards = screen.getAllByText("banana")
    const appleCards = screen.getAllByText("apple")
    const cards = [...bananaCards, ...appleCards]
    cards.forEach(card => fireEvent.click(card))
    const faceupCards = screen.getAllByTestId('facedown:false')
    expect(faceupCards.length).toBe(4)
    act(() => vi.advanceTimersByTime(10 * 1000))
    const facedownCards = screen.getAllByTestId('facedown:true')
    expect(facedownCards.length).toBe(4)
  })
})