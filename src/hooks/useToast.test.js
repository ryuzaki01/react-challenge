import { render, waitFor } from '@testing-library/react'
import useToast from './useToast'
import Layout from '../components/Layout'
import { Button, Flex, Text } from '../components/primitives'

const CustomComponent = () => {
  const { addToast } = useToast()

  return (
    <Layout>
      <Flex>
        <Text>Test Text</Text>
        <Button
          onClick={() =>
            addToast({
              title: 'Success',
              status: 'success',
              description: 'Task Removed.',
            })
          }
        >
          Add Toast Success
        </Button>
      </Flex>
    </Layout>
  )
}

it('it handle usage error', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
  await waitFor(() =>
    expect(() => render(<CustomComponent />)).toThrow(
      'useToast must be used within a Toast Context provider',
    ),
  )
  jest.restoreAllMocks()
})
