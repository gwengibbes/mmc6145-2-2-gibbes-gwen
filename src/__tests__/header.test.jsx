import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../components/header'

describe('header component', () => {
  it('should render a header tag', () => {
    const {container} = render(<Header />)
    expect(container.querySelector('header')).toBeTruthy()
  })
  it('should render time if given as a prop', () => {
    render(<Header time="3" />)
    expect(screen.getByText(/time[:\s\w]+3/i)).toBeTruthy()
  })
  it('should not render any time if not given as a prop', () => {
    render(<Header />)
    expect(screen.queryByText(/time/i)).toBeNull()
  })
  it('should render previous time if given and time not given', () => {
    render(<Header previousTime="3" />)
    expect(screen.queryByText(/^time/i)).toBeNull()
    expect(screen.getByText(/previous[:\s\w]+3/i)).toBeTruthy()
  })
  it('should render best time if given and time not given', () => {
    render(<Header bestTime="3" />)
    expect(screen.queryByText(/^time/i)).toBeNull()
    expect(screen.getByText(/best[:\s\w]+3/i)).toBeTruthy()
  })
  it('should not render previous time if time is given', () => {
    render(<Header time="3" previousTime="3" />)
    expect(screen.queryByText(/previous[:\s\w]+3/i)).toBeNull()
    expect(screen.getByText(/^time[:\s\w]+3/i)).toBeTruthy()
  })
  it('should render best time if time is given', () => {
    render(<Header time="3" bestTime="3" />)
    expect(screen.getByText(/best[:\s\w]+3/i)).toBeTruthy()
    expect(screen.getByText(/^time[:\s\w]+3/i)).toBeTruthy()
  })
  it('should render best time and previous time if given and time not given', () => {
    render(<Header bestTime="3" previousTime="4" />)
    expect(screen.queryByText(/^time/i)).toBeNull()
    expect(screen.getByText(/best[:\s\w]+3/i)).toBeTruthy()
    expect(screen.getByText(/previous[:\s\w]+4/i)).toBeTruthy()
  })
  it('should render best time and current time if all are given', () => {
    render(<Header time="2" bestTime="3" previousTime="4" />)
    expect(screen.getByText(/^time[:\s\w]+2/i)).toBeTruthy()
    expect(screen.getByText(/best[:\s\w]+3/i)).toBeTruthy()
    expect(screen.queryByText(/previous[:\s\w]+4/i)).toBeNull()
  })
  it('should call openModal prop if help button clicked', () => {
    const mockOpenModal = vi.fn()
    render(<Header openModal={mockOpenModal} />)
    fireEvent.click(screen.getByText(/help/i))
    expect(mockOpenModal).toHaveBeenCalledTimes(1)
  })
})