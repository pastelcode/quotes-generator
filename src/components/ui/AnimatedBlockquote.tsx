import { Blockquote, Float, Presence, useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Quote } from '../../api'

interface Props {
  quote: Quote
  onAnimationStart: () => void
  onAnimationComplete: () => void
}

const AnimatedBlockquote = ({
  quote,
  onAnimationStart,
  onAnimationComplete,
}: Props) => {
  const animateText = async () => {
    onAnimationStart()
    let index = 0
    while (index !== quote.quote.length + 1) {
      setText(quote.quote.substring(0, index + 1))
      await new Promise((resolve) => setTimeout(resolve, 50))
      index += 1
    }
    if (isMounted.current) onAnimationComplete()
  }

  const [text, setText] = useState('')
  const isMounted = useRef(true)
  const { open: showAuthor, onToggle: toggleShowAuthor } = useDisclosure()

  useEffect(() => {
    if (text.length === quote.quote.length) toggleShowAuthor()
  }, [text])

  useEffect(() => {
    isMounted.current = true
    animateText()
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <Blockquote.Root backgroundColor="black" variant="plain">
      <Float placement="top-start" offsetY="2">
        <Blockquote.Icon />
      </Float>
      <Blockquote.Content cite={quote.author} backgroundColor="black">
        {text}
      </Blockquote.Content>
      <Presence
        present={showAuthor}
        animationName="fade-in"
        animationDuration="slowest"
      >
        <Blockquote.Caption>
          - <cite>{quote.author}</cite>
        </Blockquote.Caption>
      </Presence>
    </Blockquote.Root>
  )
}

export default AnimatedBlockquote
