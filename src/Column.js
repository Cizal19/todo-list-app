import react from "react";
import { Flex, Text } from "@chakra-ui/react"
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = ({column, tasks}) => {
  return(
    <Flex rounded="3px" bg="column-bg" w="400px" h="620px" flexDir="column">
      <Flex
        align="center"
        h="60px"
        bg="secondary-bg"
        rounded="3px 3px 0 0"
        px="1.5rem"
        mb="1.5rem"
      >
        <Text fontSize="17px" fontWeight={600} color="subtle-text">
          {column.title}
        </Text>
      </Flex>
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <Flex 
            px="1.5rem" flex={1} 
            flexDir="column" 
            ref={droppableProvided.innerRef} 
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Flex 
                    mb="1rem" 
                    h="72px" 
                    bg="card-bg" 
                    rounded="3px" 
                    p="1.5rem"
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Text>{task.content}</Text>
                  </Flex>
                )}
              </Draggable>
            ))}
          </Flex>
        )}
      </Droppable>
    </Flex>
  )
}

export default Column