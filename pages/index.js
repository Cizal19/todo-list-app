import { Flex, Heading, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import Column from "../src/Column"
import { DragDropContext } from "react-beautiful-dnd"
import { initialData } from "../src/data"

export default function Home() {
  const [state, setState] = useState(initialData)

  const handleDragEnd = (result) => {
    const {destination, source} = result
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex py="4rem" flexDir="column" align="center">
          <Heading fontSize="3xl" fontWeight={600}>
            React Drag and Drop Interface
          </Heading>
          <Text fontSize="20px" fontWeight={600} color="subtle-text">
            Todo List App
          </Text>
        </Flex>

        <Flex justify="space-between" px="4rem">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId]
            const tasks = column.taskIds.map(taskId => state.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Flex>
      </Flex>
    </DragDropContext>
  )
}
