import { Flex, Heading, Text, Button } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { initialData } from "../src/data"


const Column = dynamic(() => import("../src/Column"), { ssr: false })

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

const Home = () => {
  
  const router = useRouter()

  useEffect(()=> {
    const data = JSON.parse(localStorage.getItem("authorized"))
    if(data != true) {
      router.push('/')
    }
  },[])
  
  const [state, setState] = useState(initialData)

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  }

  const handleLogout = () => {
    localStorage.removeItem("authorized")
    router.push("/")
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
        <Flex py="4rem" flexDir="row" align="center" justifyContent="space-between">
          <Heading fontSize="3xl" fontWeight={600} ml={20}>
            Todo List App
          </Heading>
          <Button
            type="submit"
            mr={20}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
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


export default Home