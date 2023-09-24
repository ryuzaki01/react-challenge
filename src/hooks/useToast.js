import { useContext } from 'react'
import { ToastContext } from '../context/ToastContextProvider'

const useToast = () => {
  const context = useContext(ToastContext)
  if (context.addToast === null) {
    throw new Error('useToast must be used within a Toast Context provider')
  }
  return context
}

export default useToast
