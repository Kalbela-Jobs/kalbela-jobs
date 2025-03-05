"use client"

import { useState, useRef, useEffect, type ChangeEvent, type KeyboardEvent, type MouseEvent } from "react"
import EmojiPicker from "emoji-picker-react"
import "./style/chat.css"
import "./style/messenger.css"
import "./style/sidebar.css"

import { Mic, Paperclip, Pause, Play, Send, SmilePlus, Trash } from "lucide-react"
import AudioPlayer from "./AudioPlayer"

type Attachment = {
    id: string
    file: File
    preview: string
}

function ChatBotAction({ onSendMessage }: { onSendMessage: any }) {
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

    const toggleEmojiPicker = () => setShowEmoji(!showEmoji)

    return (
        <div className='bg-[white] mt-0 md:mt-[-15px] lg:mt-[0px] shadow-xl h-[68px] flex items-center gap-2 w-full justify-center px-4 border-t relative'>
            {/* view attachment */}
            {attachments.length > 0 && (
                <div className="bg-white absolute bottom-[60px] border rounded-md shadow-lg left-2  w-[95%] flex flex-wrap gap-2 p-2 max-h-[290px] overflow-y-auto chat-bot z-10">
                    {attachments.map((att) => (
                        <div key={att.id} className="md:w-[100px] md:h-[100px] w-[80px] h-[80px] relative">
                            <button className="remove-attachment" onClick={() => removeAttachment(att.id)}>
                                ×
                            </button>
                            <img className="w-full h-full object-cover rounded" src={att.preview || "/placeholder.svg"} alt="attachment" />
                        </div>
                    ))}

                    {attachments.length > 3 && <button className="md:w-[100px] md:h-[100px] w-[80px] h-[80px] relative bg-[#cf344e58] dark:text-white text-black rounded-md" onClick={() => setAttachments([])}>
                        Clear All
                    </button>}
                </div>
            )}
            <div className="message-actions flex items-center gap-2">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm flex items-center justify-center rounded-full">
                    <Paperclip />
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                />

            </div>

            {/* emoji */}
            {showEmoji && (
                <div className="absolute md:bottom-14 bottom-[450px] left-2 z-10 md:w-auto w-[70%] md:h-auto h-[90%]" ref={emojiPickerRef}>
                    <EmojiPicker onEmojiClick={(emojiObject) => setMessage((prev) => prev + emojiObject.emoji)} />
                </div>
            )}

            {/* audio */}
            {audioBlob && (
                <div className="bg-white absolute bottom-[60px] border rounded-md shadow-lg left-2  w-[95%] flex flex-wrap gap-2 px-2 py-3 max-h-[290px] justify-between overflow-y-auto chat-bot z-10">
                    <AudioPlayer audioUrl={URL.createObjectURL(audioBlob)} />
                    <button onClick={() => setAudioBlob(null)}>
                        <Trash className="text-red-600" />
                    </button>
                </div>
            )}

            {isRecording && (
                <div className="bg-white absolute bottom-[60px] border rounded-md shadow-lg left-2  w-[95%] flex flex-wrap gap-2 p-2 max-h-[290px] overflow-y-auto chat-bot z-10">
                    <button className="action-button" onClick={stopRecording}>
                        <Pause />
                    </button>
                    <div className="recording-wave flex gap-1">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                    <span className="voice-recording-time">{formatTime(recordingTime)}</span>
                </div>
            )}

            {/* messages buttons and input */}
            <div className="w-full bg-[#e6e3e370] border rounded-full border-[#b7b5b5a4] px-2 py-0 flex items-center gap-1 h-[38px] relative">
                <button
                    ref={emojiButtonRef}
                    onClick={toggleEmojiPicker}
                    className="w-8 h-8 text-sm flex items-center justify-center rounded-full"
                >
                    <SmilePlus />
                </button>

                {/* {isEmojiOpen && (
                    <div className="absolute bottom-[45px] flex flex-wrap left-0 bg-white shadow-md p-2 rounded-md w-[230px] max-h-[300px] overflow-y-auto">
                        {
                            emojis?.map((emoji, index) => <p key={index} className="text-xl hover:bg-gray-300 duration-300 p-1 rounded-full cursor-pointer chat-bot">{emoji}</p>)
                        }
                    </div>
                )} */}

                <textarea
                    className="message-input dark:!text-white !text-black flex-grow"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                />
                <button
                    onClick={startRecording}
                    className="w-9 h-9 text-sm flex items-center justify-center rounded-full">
                    <Mic />
                </button>
            </div>
            <button
                onClick={handleSend}
                className="text-primary w-8 h-8 text-sm flex items-center justify-center rounded-full">
                <Send />
            </button>
        </div>
    )
}

export default ChatBotAction


