import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const downloadBlob = (url, type, downloadName) => {
  var a = document.createElement('a')
  a.href = url
  a.download = `${downloadName}.${type.split('/')[1]}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const speakText = async (text, language) => {
  if (!text || text.trim() === '') {
    console.error('Cannot speak empty text')
    return
  }

  console.log('Speaking text:', text.substring(0, 100) + '...')

  const utterance = new SpeechSynthesisUtterance(text)

  const synth = window.speechSynthesis
  synth.cancel()

  utterance.onstart = function () {
    console.log('Speech started event fired')
  }

  utterance.onend = function () {
    console.log('Speech ended event fired')
  }

  utterance.onerror = function (event) {
    console.error('Speech synthesis error:', event)
  }

  utterance.rate = 1.0
  utterance.pitch = 1.0
  utterance.volume = 1.0

  let voices = synth.getVoices()
  console.log('voices', voices)

  if (voices.length === 0) {
    return new Promise((resolve) => {
      synth.onvoiceschanged = () => {
        voices = synth.getVoices()
        resolve(voices)
      }
    })
  }

  if (voices && voices.length > 0) {
    const googleVoice = voices.find((v) => v.name === language) || null
    const anyVoice = voices[0]

    utterance.voice = googleVoice || anyVoice
    if (utterance.voice) {
      console.log(
        `Using voice: ${utterance.voice.name} (${utterance.voice.lang})`
      )
    } else {
      console.warn('No suitable voice found, using default voice.')
    }

    setTimeout(() => {
      console.log('Starting speech synthesis now')
      synth.speak(utterance)

      setTimeout(() => {
        if (!synth.speaking) {
          console.warn("Speech synthesis didn't start properly, trying again")
          synth.cancel()
          synth.speak(utterance)
        }
      }, 250)
    }, 100)
  } else {
    console.error('No voices available. Speech synthesis may not be supported.')
    synth.speak(utterance)
  }
}

export { downloadBlob, cn, speakText }
