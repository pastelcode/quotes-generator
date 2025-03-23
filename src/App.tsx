import { Button, Center, Heading, HStack, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { fetchQuote, Quote } from './api'
import AnimatedBlockquote from './components/ui/AnimatedBlockquote'
import LikeIcon from './components/ui/LikeIcon'
import RefreshIcon from './components/ui/RefreshIcon'

const App = () => {
  const refreshQuote = async () => {
    const fetchedQuote = await fetchQuote()
    if (fetchedQuote === null) {
      return
    }
    // The time out is cleared to avoid strange behavior if the user manually refreshes the quote and the time out just refreshes it as well
    clearTimeout(timeoutId.current)
    setQuote(fetchedQuote)
    setLiked(false)
  }

  const [quote, setQuote] = useState<Quote | null>(null)
  const [liked, setLiked] = useState(false)
  const [isAnimatingQuote, setIsAnimatingQuote] = useState(false)
  const isMounting = useRef(true)
  const timeoutId = useRef(0)

  // This effect reacts to `isAnimatingQuote` starting a time out that refreshes the quote only if the view is not mounting (see `isMounting`) and the quote finished animating
  useEffect(() => {
    if (!isAnimatingQuote && !isMounting.current) {
      timeoutId.current = setTimeout(() => refreshQuote(), 5000)
    }
  }, [isAnimatingQuote])

  // Triggers the first quote fetching when view is appearing for the first time
  useEffect(() => {
    refreshQuote()
    isMounting.current = false
  }, [])

  return (
    <Center paddingTop="5" backgroundColor="000000">
      <VStack backgroundColor="000000" maxWidth="75%">
        <Heading size="6xl" marginY="7">
          Quotes generator
        </Heading>
        {quote !== null && (
          <AnimatedBlockquote
            key={quote.quote}
            quote={quote}
            onAnimationStart={() => setIsAnimatingQuote(true)}
            onAnimationComplete={() => setIsAnimatingQuote(false)}
          />
        )}
        <HStack>
          <Button
            variant="outline"
            marginTop="5"
            onClick={() => setLiked((oldValue) => !oldValue)}
          >
            <LikeIcon liked={liked} />
            {liked ? 'Liked' : 'Like'}
          </Button>
          <Button
            variant="outline"
            marginTop="5"
            onClick={() => refreshQuote()}
          >
            <RefreshIcon />
            Refresh quote
          </Button>
        </HStack>
      </VStack>
    </Center>
  )
}

export default App
