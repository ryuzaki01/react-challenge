import { globalReset } from './stitches.config'
import Layout from './components/Layout'
import TodoList from './components/TodoList'

export default function App() {
  globalReset()

  return (
    <Layout>
      <TodoList />
    </Layout>
  )
}
