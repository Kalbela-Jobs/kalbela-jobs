"use client"

import React, { useCallback, useEffect, useState } from "react"

const lettersAndSymbols = "abcdefghijklmnopqrstuvwxyz"

interface AnimatedTextProps {
  text: string
}

export function TypingRandomizedTextEffect({ text }: AnimatedTextProps) {
  const [animatedText, setAnimatedText] = useState("")

  const getRandomChar = useCallback(
    () =>
      lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    []
  )

  const animateText = useCallback(async () => {
    const revealDuration = 100 // Delay for each character reveal
    const randomizeDuration = 50 // Delay for randomizing characters
    const randomizeCycles = 1 // Number of randomizing cycles per character

    let resultText = ""

    for (let i = 0; i < text.length; i++) {
      // Randomize the current character a few times
      for (let j = 0; j < randomizeCycles; j++) {
        await new Promise((resolve) => setTimeout(resolve, randomizeDuration))
        setAnimatedText(resultText + getRandomChar())
      }

      // Add the actual character after randomizing
      await new Promise((resolve) => setTimeout(resolve, revealDuration))
      resultText += text[i]
      setAnimatedText(resultText)
    }
  }, [text, getRandomChar])

  useEffect(() => {
    animateText()
  }, [text, animateText])

  return <div className="relative inline-block">{animatedText}</div>
}
