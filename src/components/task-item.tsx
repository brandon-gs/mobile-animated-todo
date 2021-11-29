import React from 'react'
import { Pressable } from 'react-native'
import { Box, HStack, useColorModeValue, useToken, Icon } from 'native-base'
import AnimatedCheckbox from './animated-checkbox'
import AnimatedTaskLabel from './animated-task-label'
import SwipeableView from './swipable-view'
import { Feather } from '@expo/vector-icons'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isDone: boolean
  onToggleCheckbox?: () => void
  onPressLabel?: () => void
  onRemove?: () => void
  subject: string
}

const TaskItem = (props: Props) => {
  const {
    isDone,
    onToggleCheckbox,
    subject,
    onPressLabel,
    onRemove,
    simultaneousHandlers,
  } = props

  const highlightColor = useToken(
    'colors',
    useColorModeValue('blue.500', 'blue.400')
  )
  const boxStroke = useToken(
    'colors',
    useColorModeValue('muted.300', 'muted.500')
  )

  const checkmarkColor = useToken('colors', useColorModeValue('white', 'white'))

  const activeTextColor = useToken(
    'colors',
    useColorModeValue('darkText', 'lightText')
  )
  const doneTextColor = useToken(
    'colors',
    useColorModeValue('muted.400', 'muted.600')
  )

  return (
    <SwipeableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={3}
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm" />
        </Box>
      }
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckbox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
        <AnimatedTaskLabel
          textColor={activeTextColor}
          inactiveTextColor={doneTextColor}
          strikethrough={isDone}
        >
          {subject}
        </AnimatedTaskLabel>
      </HStack>
    </SwipeableView>
  )
}

export default TaskItem
