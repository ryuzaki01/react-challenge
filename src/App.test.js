import { render, screen } from '@testing-library/react'
import ToastContextProvider from './context/ToastContextProvider'
import App from './App'

it('render without error', () => {
  render(
    <ToastContextProvider>
      <App />
    </ToastContextProvider>,
  )
  expect(screen.getByText('TODO LIST')).toBeInTheDocument()
})
