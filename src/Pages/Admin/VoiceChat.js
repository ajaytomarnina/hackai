import React, { useState, useEffect, useRef } from 'react'
import styles from './VoiceChat.module.scss'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = SpeechRecognition ? new SpeechRecognition() : null
const CLIENT_ID = '5e264bee-8250-48d5-b733-da8349d39a9d'

// Generate UUID function
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const VoiceChat = () => {
  const [isChatStarted, setIsChatStarted] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [responseText, setResponseText] = useState('')
  const [conversationId, setConversationId] = useState(
    '6b9e9b20-bc1e-48bd-96cf-1330488d152e'
  )
  const [userId] = useState('b466b2a5-4aac-4d8c-8f9f-a4be20bff338')
  const speechSynthesisRef = useRef(window.speechSynthesis)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const currentUtteranceRef = useRef(null)
  const [isThinking, setIsThinking] = useState(false)

  useEffect(() => {
    if (!recognition) {
      setStatusMessage('Speech Recognition not supported in this browser.')
      return
    }

    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
      setStatusMessage(
        isSpeaking ? 'Speaking and listening...' : 'Listening...'
      )
    }

    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1
      const latestTranscript =
        event.results[lastResultIndex][0].transcript.trim()
      setTranscript(latestTranscript)
      setResponseText('')
      setStatusMessage(`Heard: "${latestTranscript}"`)

      // If the user says "stop", then stop speaking and listening
      if (latestTranscript.toLowerCase().includes('stop')) {
        stopSpeaking()
        stopChat()
        return
      }

      handleResponse(latestTranscript)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error)
      setStatusMessage(`Error: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      if (isChatStarted) {
        try {
          recognition.start()
        } catch (err) {
          console.error('Restart error', err)
        }
      }
    }

    return () => {
      if (recognition) recognition.abort()
      stopSpeaking()
    }
  }, [isChatStarted, isSpeaking])

  const speakText = (text) => {
    if (!text || text.trim() === '') {
      console.error("Cannot speak empty text");
      return;
    }
    
    console.log("Speaking text:", text.substring(0, 100) + "...")
    
    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Store the utterance in ref for potential cancellation
    currentUtteranceRef.current = utterance
    
    // Make sure any previous speech is cancelled
    const synth = window.speechSynthesis
    synth.cancel()
    
    // Set up event handlers first, before any other operations
    utterance.onstart = function() {
      console.log("Speech started event fired")
      setIsSpeaking(true)
      setStatusMessage('Speaking response...')
    }
    
    utterance.onend = function() {
      console.log("Speech ended event fired")
      setIsSpeaking(false)
      setStatusMessage('Listening...')
    }
    
    utterance.onerror = function(event) {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
      setStatusMessage('Error in speech synthesis')
    }
    
    // Set default speech parameters
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0
    
    // Try to get available voices
    const voices = synth.getVoices()
    
    if (voices && voices.length > 0) {
      // Try to find a good default voice - prefer Google voices or English voices
      const googleVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en'))
      const englishVoice = voices.find(v => v.lang.startsWith('en'))
      const anyVoice = voices[0]
      
      // Use the best available voice
      utterance.voice = googleVoice || englishVoice || anyVoice
      console.log(`Using voice: ${utterance.voice.name} (${utterance.voice.lang})`)
      
      // Speak with a slight delay to ensure events are properly set up
      setTimeout(() => {
        console.log("Starting speech synthesis now")
        setIsSpeaking(true) // Set this state immediately, don't wait for the event
        synth.speak(utterance)
        
        // Check if speaking actually started
        setTimeout(() => {
          if (!synth.speaking) {
            console.warn("Speech synthesis didn't start properly, trying again")
            synth.cancel()
            synth.speak(utterance)
          }
        }, 250)
      }, 100)
    } else {
      console.error("No voices available. Speech synthesis may not be supported.")
      // Try to speak anyway as a fallback
      synth.speak(utterance)
      setIsSpeaking(true) // Set this manually since the event might not fire
    }
  }

  const stopSpeaking = () => {
    const synth = window.speechSynthesis
    if (isSpeaking) {
      synth.cancel()
      setIsSpeaking(false)
    }
  }

  const handleResponse = async (userSpeech) => {
    // If the user says "stop", cancel any ongoing speech and don't send API request
    if (userSpeech.toLowerCase().includes('stop')) {
      stopSpeaking()
      return
    }

    // Cancel any ongoing speech when a new question is asked
    stopSpeaking()

    setStatusMessage('Getting response...')
    setIsThinking(true)

    try {
      const messageId = generateUUID()

      const response = await fetch(
        'https://hedwigtest.wyzard.in/api/v1/chat/stream/mono',
        {
          method: 'POST',
          headers: {
            'X-CLIENT-ID': CLIENT_ID,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userSpeech,
            messageId: messageId,
            from: userId,
            conversationId: conversationId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      // Get the response text first
      const responseText = await response.text()
      let apiResponseText

      // Try to parse as JSON, if it fails, use the text directly
      try {
        const data = JSON.parse(responseText)
        console.log('Parsed JSON data:', data)
        apiResponseText =
          data.response?.text || data.message || 'No response from API'
      } catch (jsonError) {
        console.log('Response is plain text, not JSON')
        apiResponseText = responseText
      }

      // Update the response text state
      setResponseText(apiResponseText)
      setIsThinking(false)

      // Speak the API response
      speakText(apiResponseText)
    } catch (error) {
      console.error('Error calling API:', error)
      setStatusMessage(`Error: ${error.message}`)
      setIsThinking(false)

      // Update response text with error
      setResponseText(`Error: ${error.message}`)

      // Don't speak the user's speech as fallback anymore
      // Instead, speak an error message
      speakText("Sorry, I couldn't get a response at this time.")
    }
  }

  const startChat = () => {
    if (!recognition) {
      setStatusMessage('Speech Recognition not supported in this browser.')
      return
    }
    if (!isListening) {
      try {
        recognition.start()
        setIsChatStarted(true)
      } catch (err) {
        console.error('Error starting recognition:', err)
      }
    }
  }

  const stopChat = () => {
    if (recognition && isListening) {
      recognition.stop()
      setIsChatStarted(false)
      setStatusMessage('Chat stopped.')
    }
    stopSpeaking()
  }

  console.log(transcript, 'transcript')
  console.log(responseText, 'responseText')

  // Helper function to determine button background color
  const getButtonBackgroundColor = () => {
    if (isThinking) return "#ff6b6b"; // Red when API is pending
    if (isSpeaking) return "#4dabf7"; // Blue when speaking
    if (isListening) return "#40c057"; // Green when listening
    return "#ffffff1f"; // Default color when doing nothing
  }

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="mb-6">
        <img
          src="https://images.wyzard.ai/agents/natashaWilliams.png"
          alt="Agent"
          className="w-72 h-72 rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="text-center w-full">
        <div className="mb-4 text-white">{statusMessage}</div>
        <button 
          className={`${styles.sendBtn} ${isListening || isThinking || isSpeaking ? styles.listeningBtn : ''}`}
          onMouseDown={startChat}
          onMouseUp={stopChat}
          onTouchStart={startChat}
          onTouchEnd={stopChat}
          style={{ backgroundColor: getButtonBackgroundColor() }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="36"
              height="36"
              rx="18"
              fill={"white"}
              fillOpacity="0.12"
            />
            <path
              d="M18 22.5c2.5 0 4.5-2 4.5-4.5v-6c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5v6c0 2.5 2 4.5 4.5 4.5z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 18c0 3 2.5 5.5 5.5 5.5s5.5-2.5 5.5-5.5M18 23.5v3M14.5 26.5h7"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default VoiceChat
