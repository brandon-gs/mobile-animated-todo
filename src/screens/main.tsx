import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'
import { Text, Box, Center, VStack, useColorModeValue } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import AnimatedCheckbox from '../components/animated-checkbox'
import TaskItem from '../components/task-item'

export default function MainScreen() {
  const [checked, setChecked] = useState(false)
  const [subject, setSubject] = useState('Task item')
  const [isEditing, setEditing] = useState(false)

  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskItem
          isEditing={isEditing}
          isDone={checked}
          onToggleCheckbox={handlePressCheckbox}
          subject={subject}
          onPressLabel={() => setEditing(true)}
          onChangeSubject={setSubject}
          onFinishEditing={() => setEditing(false)}
        />
        <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
          <Text>Hello</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}
