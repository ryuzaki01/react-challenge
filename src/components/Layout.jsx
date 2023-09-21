import { Box } from './primitives'
import * as propType from 'prop-types'

const Layout = ({ children }) => {
  return (
    <Box
      css={{
        height: '100%',
        minHeight: '100vh',
      }}
    >
      <Box css={{ maxWidth: 1920, mx: 'auto' }}>
        <main>{children}</main>
      </Box>
    </Box>
  )
}

Layout.propTypes = {
  children: propType.node,
}

export default Layout
