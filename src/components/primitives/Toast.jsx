import { useContext } from 'react'
import { keyframes, styled } from '@stitches/react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import * as propType from 'prop-types'

import { ToastContext } from '../../context/ToastContextProvider'
import Flex from './Flex'

const VIEWPORT_PADDING = 25

export const ToastViewport = styled(ToastPrimitive.Viewport, {
  padding: VIEWPORT_PADDING,
  position: 'fixed',
  right: 0,
  bottom: 10,
  '@lg': {
    bottom: 0,
  },
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '327px',
  maxWidth: '100vw',
  zIndex: 9999999999,
})

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
})

const ToastRoot = styled(ToastPrimitive.Root, {
  backgroundColor: '$gray3',
  borderRadius: 6,
  padding: 12,
  display: 'flex',
  gap: 8,
  alignItems: 'start',

  '&[data-state="closed"]:first-child': {
    animation: `${hide} 100ms ease-in`,
  },
  '&[data-swipe="move"]': {
    transform: 'translateX(var(--radix-toast-swipe-move-x))',
  },
  '&[data-swipe="cancel"]': {
    transform: 'translateX(0)',
    transition: 'transform 200ms ease-out',
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },
})

const ToastTitle = styled(ToastPrimitive.Title, {
  gridArea: 'title',
  fontSize: '14px',
  fontWeight: 500,
})

const ToastDescription = styled(ToastPrimitive.Description, {
  gridArea: 'description',
  fontSize: '12px',
  fontWeight: 400,
  color: '$gray11',
})

const ToastAction = styled(ToastPrimitive.Action, {})

const Toast = ({ id, title, description, action, status }) => {
  const { toasts, setToasts } = useContext(ToastContext)

  return (
    <>
      <ToastRoot
        key={title}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(
              () => setToasts?.(toasts.filter((toast) => toast.id !== id)),
              100,
            )
          }
        }}
      >
        {status !== undefined ? (
          <Flex css={{ color: status === 'error' ? '$red10' : '$green10' }}>
            <FontAwesomeIcon
              icon={status === 'error' ? faCircleXmark : faCircleCheck}
              width={16}
            />
          </Flex>
        ) : null}
        <Flex direction="column">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
          <ToastAction asChild altText="Toast action">
            {action}
          </ToastAction>
        </Flex>
      </ToastRoot>
    </>
  )
}

Toast.propTypes = {
  id: propType.string,
  title: propType.string,
  description: propType.oneOfType([propType.string, propType.node]),
  action: propType.node,
  status: propType.string,
}

export default Toast
