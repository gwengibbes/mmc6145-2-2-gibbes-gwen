import { afterEach, vi, beforeEach, afterAll } from 'vitest'
import { cleanup, configure } from '@testing-library/react'
import '@testing-library/jest-dom'

configure({
  getElementError: (message, container) => {
    const error = new Error(message);
    error.name = 'TestingLibraryElementError';
    error.stack = null;
    return error;
  },
});

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  cleanup()
  vi.clearAllTimers()
  vi.clearAllMocks()
})

afterAll(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})