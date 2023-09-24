import { useState, createContext } from 'react'
import { Provider as ToastProvider } from '@radix-ui/react-toast'
import Toast, { ToastViewport } from '../components/primitives/Toast'
import { v4 as uuidv4 } from 'uuid'
import propTypes from 'prop-types'

export const ToastContext = createContext({
  toasts: [],
  setToasts: null,
  addToast: null,
})

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    toast.id = uuidv4()
    setToasts([...toasts, toast])
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, setToasts }}>
      <ToastProvider duration={3000}>
        {children}
        {toasts.map((toast, idx) => {
          return (
            <Toast
              key={idx}
              id={toast.id}
              title={toast.title}
              description={toast.description}
              action={toast.action}
              status={toast.status}
            />
          )
        })}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

ToastContextProvider.propTypes = {
  children: propTypes.node,
}

export default ToastContextProvider
