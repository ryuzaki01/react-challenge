import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import * as propType from 'prop-types'

import { Flex, AnimatedFlex, Button, Input, Text } from './primitives'

const TodoItem = ({ data, onDelete, onCheck }) => {
  return (
    <AnimatedFlex
      justify="between"
      css={{
        backgroundColor: '$gray4',
        px: 18,
        py: 10,
        borderRadius: 8,
        cursor: 'pointer',
      }}
      transition={{ duration: 0.2 }}
      whileHover={{ backgroundColor: '#2e3135' }}
      initial={{ opacity: 0, scaleX: 0, translateX: '100%' }}
      animate={{
        opacity: 1,
        scaleX: 1,
        translateX: '0%',
      }}
      exit={{
        opacity: 0,
        scaleX: 0.5,
        translateX: '-50%',
      }}
    >
      <Flex css={{ gap: 10 }}>
        <Input
          type="checkbox"
          defaultChecked={data?.checked}
          data-testid="todo-check"
          onChange={(e) => {
            onCheck(data?.id, !!e.target.checked)
          }}
        />
        <Text style="subtitle1">{data?.title}</Text>
      </Flex>
      <Flex direction="column">
        <Button
          size="xs"
          color="red"
          data-testid="todo-delete"
          onClick={() => {
            onDelete(data?.id)
          }}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ width: 16, height: 16 }}
          />
          <Text css={{ display: 'none', '@md': { display: 'block' } }}>
            Delete
          </Text>
        </Button>
      </Flex>
    </AnimatedFlex>
  )
}

TodoItem.propTypes = {
  data: propType.object,
  onDelete: propType.func,
  onCheck: propType.func,
}

export default TodoItem
