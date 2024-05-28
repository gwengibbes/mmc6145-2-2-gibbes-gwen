import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {act} from 'react-dom/test-utils'
import { useTimer } from '../util/customHooks.js'


function TimerTester() {
  const {time, start, stop, reset} = useTimer()
  return (
    <>
      <div data-testid="time">{time}</div>
      <button data-testid="start" onClick={start}>start</button>
      <button data-testid="stop" onClick={stop}>stop</button>
      <button data-testid="reset" onClick={reset}>reset</button>
    </>
  )
}

describe('useTimer', () => {
  it('should show time of 0 initially', () => {
    render(<TimerTester />)
    expect(screen.getByTestId('time').textContent).toBe('0')
  })
  it('should advance time by 1 each second when calling start', () => {
    render(<TimerTester />)
    expect(screen.getByTestId('time').textContent).toBe('0')
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByTestId('time').textContent).toBe('10')
  })
  it('should stop timer counting when calling stop', () => {
    render(<TimerTester />)
    expect(screen.getByTestId('time').textContent).toBe('0')
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByTestId('time').textContent).toBe('10')
    fireEvent.click(screen.getByTestId('stop'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByTestId('time').textContent).toBe('10')
  })
  it('should set time to 0 when calling reset', () => {
    render(<TimerTester />)
    expect(screen.getByTestId('time').textContent).toBe('0')
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByTestId('time').textContent).toBe('10')
    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.getByTestId('time').textContent).toBe('0')
  })
  it('should set time to 0 and continue counting when calling reset', () => {
    render(<TimerTester />)
    expect(screen.getByTestId('time').textContent).toBe('0')
    fireEvent.click(screen.getByTestId('start'))
    act(() => vi.advanceTimersByTime(10 * 1000))
    expect(screen.getByTestId('time').textContent).toBe('10')
    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.getByTestId('time').textContent).toBe('0')
    act(() => vi.advanceTimersByTime(15 * 1000))
    expect(screen.getByTestId('time').textContent).toBe('15')
  })
})