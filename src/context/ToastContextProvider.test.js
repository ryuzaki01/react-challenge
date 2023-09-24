import { act, render } from '@testing-library/react'
import ToastContextProvider from './ToastContextProvider'
import Layout from '../components/Layout'
import { Button, Flex, Text } from '../components/primitives'
import useToast from '../hooks/useToast'
import { userEvent } from '@testing-library/user-event'

// eslint-disable-next-line react/prop-types
const Container = ({ children }) => {
  return <ToastContextProvider>{children}</ToastContextProvider>
}

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
        <Button
          onClick={() =>
            addToast({
              title: 'Error',
              status: 'error',
              description: 'Task Error.',
            })
          }
        >
          Add Toast Error
        </Button>
        <Button
          onClick={() =>
            addToast({
              title: 'Generic',
              status: undefined,
              description: 'Task',
            })
          }
        >
          Add Toast Generic
        </Button>
      </Flex>
    </Layout>
  )
}

jest.useFakeTimers()

it('able to display toast message', async () => {
  const user = userEvent.setup()
  const { getByText, findByText } = render(
    <Container>
      <CustomComponent />
    </Container>,
  )
  user.click(getByText('Add Toast Success'))
  const taskRemovedToast = await findByText('Task Removed.')
  expect(taskRemovedToast).toBeInTheDocument()

  act(() => {
    jest.advanceTimersByTime(3000)
  })

  user.click(getByText('Add Toast Error'))
  expect(await findByText('Task Error.')).toBeInTheDocument()

  act(() => {
    jest.advanceTimersByTime(3000)
  })

  user.click(getByText('Add Toast Generic'))

  act(() => {
    jest.advanceTimersByTime(3000)
  })

  expect(taskRemovedToast).not.toBeInTheDocument()
})
