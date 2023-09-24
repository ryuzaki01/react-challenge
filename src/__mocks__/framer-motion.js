import * as React from 'react'

const actual = jest.requireActual('framer-motion')

function custom(Component, _customMotionComponentConfig = {}) {
  // eslint-disable-next-line react/display-name
  return React.forwardRef((props, ref) => {
    const regularProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !actual.isValidMotionProp(key)),
    )
    return typeof Component === 'string' ? (
      <div ref={ref} {...regularProps} />
    ) : (
      <Component ref={ref} {...regularProps} />
    )
  })
}

const componentCache = new Map()
const motion = new Proxy(custom, {
  get: (_target, key) => {
    if (!componentCache.has(key)) {
      componentCache.set(key, custom(key))
    }
    return componentCache.get(key)
  },
})

// eslint-disable-next-line no-undef
module.exports = {
  __esModule: true,
  ...actual,
  // eslint-disable-next-line react/prop-types
  AnimatePresence: ({ children }) => <>{children}</>,
  motion,
}
