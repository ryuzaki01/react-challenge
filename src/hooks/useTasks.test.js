import {render, waitFor} from '@testing-library/react'
import Layout from '../components/Layout'
import { Flex } from '../components/primitives'
import useTasks from './useTasks'

const CustomComponent = () => {
  const { data: tasks } = useTasks()

  return (
    <Layout>
      <Flex data-testid="tasks">
        {(tasks || []).map((t) => (
          <Flex key={t.id}>{t.title}</Flex>
        ))}
      </Flex>
    </Layout>
  )
}

it('it load tasks', async () => {
  fetch.mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: 'Finish an interview',
            checked: true,
          },
          {
            id: 2,
            title: 'Study React',
            checked: true,
          },
        ]),
    }),
  )

  const { getByTestId } = await render(<CustomComponent />)
  await waitFor(() => {
    expect(getByTestId('tasks').childNodes.length).toBeGreaterThan(0)
  })
})
