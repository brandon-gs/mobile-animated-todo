import React, { useCallback } from 'react'
import {
  NativeSyntheticEvent,
  Pressable,
  TextInputChangeEventData,
} from 'react-native'
import {
  Box,
  HStack,
  useColorModeValue,
  useToken,
  Icon,
  Input,
} from 'native-base'
import AnimatedCheckbox from './animated-checkbox'
import AnimatedTaskLabel from './animated-task-label'
import SwipeableView from './swipable-view'
import { Feather } from '@expo/vector-icons'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isEditing: boolean
  isDone: boolean
  onToggleCheckbox?: () => void
  onPressLabel?: () => void
  onRemove?: () => void
  onChangeSubject?: (subject: string) => void
  onFinishEditing?: () => void
  subject: string
}

const TaskItem = (props: Props) => {
  const {
    isEditing,
    isDone,
    onToggleCheckbox,
    subject,
    onPressLabel,
    onRemove,
    onChangeSubject,
    onFinishEditing,
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

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text)
    },
    [onChangeSubject]
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
        {isEditing ? (
          <Input
            placeholder="Task"
            value={subject}
            variant="unstyled"
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            onPress={onPressLabel}
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipeableView>
  )
}

export default TaskItem
