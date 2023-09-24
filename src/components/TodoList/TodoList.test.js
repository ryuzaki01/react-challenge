import { render, screen, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import TodoList from './'
import ToastContextProvider from '../../context/ToastContextProvider'

jest.mock('framer-motion')
jest.mock('../../hooks/useTasks', () => () => ({
  data: [
    {
      id: 1,
      title: 'Finish an interview',
      checked: true,
    },
  ],
  mutate: jest.fn(),
}))

const setup = () => {
  const utils = render(
    <ToastContextProvider>
      <TodoList />
    </ToastContextProvider>,
  )
  const component = screen.getByTestId('todo-list')

  return {
    component,
    ...utils,
  }
}

beforeEach(() => {
  fetch.resetMocks()
})

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks()
})

it('render without error', () => {
  const { getByText } = setup()
  expect(getByText('Finish an interview')).toBeInTheDocument()
})

it('allow to input task title, ', async () => {
  const user = userEvent.setup()
  const { getByTestId } = setup()
  const inputValue = 'Test task'
  const taskTitleInput = getByTestId('task-title')
  fetch.mockReturnValue(Promise.resolve(null))
  await user.type(taskTitleInput, inputValue)

  expect(taskTitleInput).toHaveDisplayValue(inputValue)

  fireEvent.invalid(taskTitleInput)
})

it('allow to check and delete task', async () => {
  const user = userEvent.setup()
  const { getByTestId } = setup()
  const todoCheck = getByTestId('todo-check')
  fetch.mockReturnValue(Promise.resolve(null))
  await user.click(todoCheck)

  expect(fetch).toHaveBeenCalledTimes(1)

  const todoDelete = screen.getByTestId('todo-delete')
  await user.click(todoDelete)

  expect(fetch).toHaveBeenCalledTimes(2)
})

it('allow to submit task and handle failure', async () => {
  const user = userEvent.setup()
  const { getByTestId } = setup()
  const submitTaskButton = getByTestId('task-submit')
  fetch.mockReturnValueOnce(null)
  await user.click(submitTaskButton)

  expect(fetch).toHaveBeenCalledTimes(1)

  fetch.mockRejectedValueOnce('Test')
  await user.click(submitTaskButton)

  expect(fetch).toHaveBeenCalledTimes(2)
})
