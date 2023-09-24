import { render, screen } from '@testing-library/react'
import {userEvent} from "@testing-library/user-event";
import TodoItem from './TodoItem'

const todoMockData = {
  title: 'Test Title'
}

it('render without error', () => {
  render(<TodoItem data={todoMockData} />)
  expect(screen.getByText('Test Title')).toBeInTheDocument()
})

it('allow to check and delete task', async () => {
  const onChange = jest.fn()
  const onDelete = jest.fn()
  const user = userEvent.setup()

  render(
    <TodoItem data={todoMockData} onCheck={onChange} onDelete={onDelete} />,
  )
  const todoCheck = screen.getByTestId('todo-check')

  await user.click(todoCheck)

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(todoCheck).toBeChecked()

  const todoDelete = screen.getByTestId('todo-delete')
  await user.click(todoDelete)

  expect(onDelete).toHaveBeenCalledTimes(1)
})
