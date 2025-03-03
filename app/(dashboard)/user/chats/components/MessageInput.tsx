"use client"

import { useState, useRef, useEffect, type ChangeEvent, type KeyboardEvent, type MouseEvent } from "react"
import EmojiPicker from "emoji-picker-react"
import "../message/style/chat.css"
import "../message/style/messenger.css"
import "../message/style/sidebar.css"
import { Pause, Play, Send, Trash } from "lucide-react"

type Attachment = {
      id: string
      file: File
      preview: string
}

function MessageInput({ onSendMessage }: { onSendMessage: any }) {
      const [message, setMessage] = useState<string>("")
      const [showEmoji, setShowEmoji] = useState<boolean>(false)
      const [attachments, setAttachments] = useState<Attachment[]>([])
      const [isRecording, setIsRecording] = useState<boolean>(false)
      const [recordingTime, setRecordingTime] = useState<number>(0)
      const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
      const fileInputRef = useRef<HTMLInputElement>(null)
      const recordingInterval = useRef<NodeJS.Timeout | null>(null)
      const mediaRecorderRef = useRef<MediaRecorder | null>(null)
      const emojiPickerRef = useRef<HTMLDivElement>(null)
      const emojiButtonRef = useRef<HTMLButtonElement>(null)

      const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`

      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  if (
                        emojiPickerRef.current &&
                        !emojiPickerRef.current.contains(event.target as Node) &&
                        emojiButtonRef.current &&
                        !emojiButtonRef.current.contains(event.target as Node)
                  ) {
                        setShowEmoji(false)
                  }
            }

            document.addEventListener("mousedown", handleClickOutside as any)

            return () => {
                  document.removeEventListener("mousedown", handleClickOutside as any)
            }
      }, [])

      const handleSend = () => {
            if (message.trim() || attachments.length > 0 || audioBlob) {
                  onSendMessage({ text: message, attachments, audio: audioBlob })
                  setMessage("")
                  setAttachments([])
                  setAudioBlob(null)
            }
      }

      const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
            }
      }

      const startRecording = async () => {
            try {
                  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                  const mediaRecorder = new MediaRecorder(stream)
                  mediaRecorderRef.current = mediaRecorder
                  const audioChunks: Blob[] = []

                  mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data)

                  mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
                        setAudioBlob(audioBlob)
                  }

                  mediaRecorder.start()
                  setIsRecording(true)
                  setRecordingTime(0)
                  recordingInterval.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000)
            } catch (error) {
                  console.error("Error accessing microphone:", error)
            }
      }

      const stopRecording = () => {
            if (mediaRecorderRef.current) {
                  mediaRecorderRef.current.stop()
                  mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
            }
            setIsRecording(false)
            clearInterval(recordingInterval.current as any)
      }

      const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || [])
            const newAttachments: Attachment[] = files.map((file) => ({
                  id: Math.random().toString(),
                  file,
                  preview: URL.createObjectURL(file),
            }))
            setAttachments((prev) => [...prev, ...newAttachments])
      }

      const removeAttachment = (id: string) => setAttachments((prev) => prev.filter((att) => att.id !== id))

      const toggleEmojiPicker = () => setShowEmoji((prev) => !prev)

      return (
            <div className="message-input-container primary-bg relative">
                  {attachments.length > 0 && (
                        <div className="attachment-preview">
                              {attachments.map((att) => (
                                    <div key={att.id} className="preview-item">
                                          <img src={att.preview || "/placeholder.svg"} alt="attachment" />
                                          <button className="remove-attachment" onClick={() => removeAttachment(att.id)}>
                                                ×
                                          </button>
                                    </div>
                              ))}
                        </div>
                  )}

                  {audioBlob && (
                        <div className="audio-preview flex gap-2 items-center">
                              <AudioPlayer audioUrl={URL.createObjectURL(audioBlob)} />
                              <button onClick={() => setAudioBlob(null)}>
                                    <Trash className="text-gray-300" />
                              </button>
                        </div>
                  )}

                  {isRecording ? (
                        <div className="voice-recording flex items-center gap-2">
                              <button className="action-button" onClick={stopRecording}>
                                    <Play />
                              </button>
                              <div className="recording-wave flex gap-1">
                                    {[...Array(20)].map((_, i) => (
                                          <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                                    ))}
                              </div>
                              <span className="voice-recording-time">{formatTime(recordingTime)}</span>
                        </div>
                  ) : (
                        <div className="message-input-wrapper flex items-center gap-2">
                              <div className="message-actions flex items-center gap-2">
                                    <button className="action-button" onClick={() => fileInputRef.current?.click()}>
                                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                          </svg>
                                    </button>
                                    <input
                                          type="file"
                                          ref={fileInputRef}
                                          onChange={handleFileChange}
                                          multiple
                                          accept="image/*"
                                          style={{ display: "none" }}
                                    />
                                    <button ref={emojiButtonRef} className="action-button" onClick={toggleEmojiPicker}>
                                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                                <line x1="15" y1="9" x2="15.01" y2="9" />
                                          </svg>
                                    </button>

                                    {showEmoji && (
                                          <div className="absolute bottom-12 left-20 z-10" ref={emojiPickerRef}>
                                                <EmojiPicker onEmojiClick={(emojiObject) => setMessage((prev) => prev + emojiObject.emoji)} />
                                          </div>
                                    )}
                              </div>

                              <textarea
                                    className="message-input flex-grow"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    rows={1}
                              />

                              <div className="message-actions flex items-center gap-2">
                                    <button className="action-button" onClick={startRecording}>
                                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                                <line x1="12" y1="19" x2="12" y2="23" />
                                                <line x1="8" y1="23" x2="16" y2="23" />
                                          </svg>
                                    </button>
                                    <button
                                          className="bg-gray-600 text-blue-500 size-8 flex justify-center items-center rounded-full hover:bg-gray-700"
                                          onClick={handleSend}
                                    >
                                          <Send />
                                    </button>
                              </div>
                        </div>
                  )}
            </div>
      )
}

export default MessageInput

function AudioPlayer({ audioUrl }: { audioUrl: string }) {
      const audioRef = useRef<HTMLAudioElement>(null)
      const [isPlaying, setIsPlaying] = useState<boolean>(false)
      const [currentTime, setCurrentTime] = useState<number>(0)
      const [duration, setDuration] = useState<number>(0)

      const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`

      useEffect(() => {
            const audio = audioRef.current
            if (audio) {
                  const updateTime = () => setCurrentTime(audio.currentTime)
                  const setAudioDuration = () => setDuration(audio.duration)

                  audio.addEventListener("timeupdate", updateTime)
                  audio.addEventListener("loadedmetadata", setAudioDuration)

                  return () => {
                        audio.removeEventListener("timeupdate", updateTime)
                        audio.removeEventListener("loadedmetadata", setAudioDuration)
                  }
            }
      }, [])

      const togglePlay = () => {
            if (!audioRef.current) return;

            if (isPlaying || currentTime === (duration as number)) {
                  audioRef.current.pause();
            } else {
                  audioRef.current.play();
            }

            setIsPlaying((prev) => !prev);
      };

      return (
            <div className="audio-player flex items-center gap-2">
                  <button onClick={togglePlay}>{isPlaying ? <Pause /> : <Play />}</button>
                  <span className="text-xs">
                        {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <audio ref={audioRef} src={audioUrl} preload="metadata" />
            </div>
      )
}
