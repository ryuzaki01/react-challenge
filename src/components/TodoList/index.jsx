import { AnimatePresence } from 'framer-motion'

import { Box, Button, Flex, Input, Text } from '../primitives'
import TodoItem from '../TodoItem'
import useTasks from '../../hooks/useTasks'
import { useContext } from 'react'
import { ToastContext } from '../../context/ToastContextProvider'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * TODO List
 */
export default function TodoList() {
  const { data: tasks, mutate } = useTasks({
    refreshInterval: 5000,
  })
  const { addToast } = useContext(ToastContext)

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })
    await mutate()
    addToast?.({
      title: 'Success',
      status: 'success',
      description: 'Task Removed.',
    })
  }

  const handleCheckTask = async (id, checked) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        checked,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await mutate()
  }

  const handleSubmitTask = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const taskData = Object.fromEntries(data.entries())

    try {
      await fetch(`http://localhost:3001/tasks`, {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await mutate()
      addToast?.({
        title: 'Success',
        status: 'success',
        description: 'Task Added',
      })
      e.target.reset()
    } catch (e) {
      addToast?.({
        title: 'Error',
        status: 'error',
        description: 'Failed to add task',
      })
    }
  }

  return (
    <Box
      css={{
        height: '100%',
        width: 'calc(100% - 32px)',
        margin: 'auto',
        flexFlow: 'column nowrap',
        position: 'relative',
        '@bp600': {
          maxWidth: '57.75rem',
          mt: '2.5rem',
        },
        '@bp900': {
          maxWidth: '69rem',
          mb: '10.8125rem',
        },
      }}
    >
      <Flex
        direction="column"
        align="stretch"
        css={{
          py: 24,
          gap: 40,
        }}
      >
        <Flex align="center" justify="center" css={{ gap: 10 }}>
          <FontAwesomeIcon
            icon={faListCheck}
            style={{ width: 30, height: 30 }}
          />
          <Text style="h1" css={{ textAlign: 'center' }}>
            TODO LIST
          </Text>
        </Flex>
        <Flex
          as="form"
          css={{
            flexDirection: 'column',
            gap: 10,
            '@md': {
              flexDirection: 'row',
            },
          }}
          onSubmit={handleSubmitTask}
        >
          <Input
            required
            css={{
              width: '100%',
              '@md': {
                width: 500,
              },
            }}
            name="title"
            placeholder="Set your task title"
          />
          <Button
            color="primary"
            type="submit"
            css={{
              display: 'inline-block',
            }}
          >
            Create Task
          </Button>
        </Flex>
        <Flex
          direction="column"
          css={{
            gap: 5,
          }}
        >
          <AnimatePresence>
            {(tasks || []).map((t) => (
              <TodoItem
                key={`task-${t.id}`}
                data={t}
                onCheck={handleCheckTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </Flex>
      </Flex>
    </Box>
  )
}
