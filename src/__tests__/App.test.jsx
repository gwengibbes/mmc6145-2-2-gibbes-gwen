import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {act} from 'react-dom/test-utils'

vi.mock('../components/cardGame', () => ({default: vi.fn(({onGameStart, onGameEnd}) => {
  return (
    <>
      <button data-testid="start" onClick={onGameStart}>Start</button>
      <button data-testid="end" onClick={onGameEnd}>End</button>
    </>
  )
})}))

import App from '../App';

describe('Card Game Application', () => {
  it('should not show timer when game starts', () => {
    render(<App />)
    expect(screen.queryByText(/time:\s\d$/i)).toBeNull()
  })
  it('should not show best time when game starts', () => {
    render(<App />)
    expect(screen.queryByText(/best[:\s\w]+\d$/i)).toBeNull()
  })
  it('should not show previous time when game starts', () => {
    render(<App />)
    expect(screen.queryByText(/previous[:\s\w]+\d$/i)).toBeNull()
  })
  it('should show timer when game is started', async () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByText(/time:\s10$/i)).not.toBeNull()
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByText(/time:\s20$/i)).not.toBeNull()
  })
  it('should NOT show timer after game ends', async () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByText(/time[\s\w:]+10/i)).not.toBeNull()
    fireEvent.click(screen.getByTestId('end'))
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.queryByText(/^time[\s\w:]+[\d]+$/i)).toBeNull()
  })
  it('should NOT continue counting after game ends', async () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByText(/time[\s\w:]+10/i)).not.toBeNull()
    fireEvent.click(screen.getByTestId('end'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.queryByText(/^time[\s\w:]+[\d]+$/i)).toBeNull()
  })
  it('should show previous time after game ends', async () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByText(/time[\s\w:]+10/i)).not.toBeNull()
    fireEvent.click(screen.getByTestId('end'))
    expect(screen.getByText(/previous[\s\w:]+10/i)).not.toBeNull()
  })
  it('should show best time after game ends', async () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByText(/time[\s\w:]+10/i)).not.toBeNull()
    fireEvent.click(screen.getByTestId('end'))
    expect(screen.getByText(/best[\s\w:]+10/i)).not.toBeNull()
  })
  it('lower time should overwrite previous best time', async () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByText(/time[\s\w:]+10/i)).not.toBeNull()
    fireEvent.click(screen.getByTestId('end'))
    expect(screen.getByText(/best[\s\w:]+10/i)).not.toBeNull()
    expect(screen.getByText(/previous[\s\w:]+10/i)).not.toBeNull()
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(5 * 1000))
    fireEvent.click(screen.getByTestId('end'))
    expect(screen.getByText(/best[\s\w:]+5/i)).not.toBeNull()
    expect(screen.getByText(/previous[\s\w:]+5/i)).not.toBeNull()
  })
})