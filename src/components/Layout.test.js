import { render } from '@testing-library/react'
import Layout from './Layout'
import { Flex, Text } from './primitives'

const setup = () => {
  return render(
    <Layout>
      <Flex
        css={{
          m: 1,
          mx: 1,
          my: 1,
          mt: 1,
          mb: 1,
          ml: 1,
          mr: 1,
          p: 1,
          pt: 1,
          pb: 1,
          px: 1,
          py: 1,
          pl: 1,
          pr: 1,
          w: 100,
          h: 100,
          size: 100,
        }}
      >
        <Text>Test Text</Text>
      </Flex>
    </Layout>,
  )
}

it('render without error', () => {
  const { getByText } = setup()
  expect(getByText('Test Text')).toBeInTheDocument()
})
