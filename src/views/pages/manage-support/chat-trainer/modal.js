import { Fragment, useContext, useState, useRef, useEffect } from 'react'
import {
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  ModalBody,
  FormFeedback,
  Form
} from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import '@styles/react/libs/react-select/_react-select.scss'
import { UserContext } from './useContext'
import { useTranslation } from 'react-i18next'
import api from '../../../../api'
import ModalHeader from '../../../../@core/components/modal-header'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
// import Flatpickr from 'react-flatpickr'
import { Send, User, Bot } from 'lucide-react'
import { createSignalRConnection } from '../../../../utility/signalR'
import { notificationError } from '../../../../utility/notification'
const defaultValues = {

}

const formSchema = yup.object().shape({

})

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const ModalComponent = () => {
  const {
    openModal,
    handleModal,
    // handleLoadTable,
    setDataItem,
    dataItem,
    typeModal } = useContext(UserContext)
  const { t } = useTranslation()

  const {
    // control,
    // setError,
    clearErrors,
    // handleSubmit,
    setValue,
    reset,
    formState: { }
  } = useForm({ defaultValues, resolver: yupResolver(formSchema) })

  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connection, setConnection] = useState(null)
  console.log(isConnected)
  console.log('item', dataItem)
  useEffect(() => {
    let mounted = true
    const newConnection = createSignalRConnection()
    setConnection(newConnection)

    const startConnection = async () => {
      try {
        await newConnection.start()
        if (mounted) {
          console.log('SignalR Connected!')
          setIsConnected(true)

          // Update the event listener to match backend method
          newConnection.on('ReceiveMessage', (messageData) => {
            console.log('Received message:', messageData)
            if (mounted) {
              const newMessage = {
                id: messageData.messageChatDetailsId || Date.now(), // Use existing ID if available
                text: messageData.message,
                time: messageData.timestamp || new Date().toISOString(),
                sender: messageData.senderId === dataItem.memberId ? 'bot' : 'user'
              }

              // Prevent duplicate messages
              setMessages(prev => {
                const isDuplicate = prev.some(msg => msg.text === newMessage.text && msg.time === newMessage.time)
                // Only add the message if it's not a duplicate
                return isDuplicate ? prev : [...prev, newMessage]
              })
            }
          })

          // Join chat room with retry logic
          if (dataItem.chatId) {
            try {
              console.log('Joining room:', dataItem.chatId)
              await newConnection.invoke('JoinChat', dataItem.chatId.toString())
              console.log('Joined room successfully')
            } catch (joinError) {
              console.error('Error joining room:', joinError)
              setTimeout(async () => {
                try {
                  await newConnection.invoke('JoinChat', dataItem.chatId.toString())
                  console.log('Joined room successfully after retry')
                } catch (retryError) {
                  console.error('Failed to join room after retry:', retryError)
                }
              }, 3000)
            }
          }
        }
      } catch (err) {
        console.error('SignalR Connection Error: ', err)
        if (mounted) {
          setIsConnected(false)
          setTimeout(startConnection, 5000)
        }
      }
    }

    startConnection()

    return () => {
      mounted = false
      if (newConnection) {
        const cleanup = async () => {
          try {
            if (dataItem.chatId && newConnection.state === 'Connected') {
              await newConnection.invoke('LeaveChat', dataItem.chatId.toString())
              console.log('Left room successfully')
            }
            newConnection.off('ReceiveMessage')
            await newConnection.stop()
            console.log('Connection stopped')
          } catch (err) {
            console.error('Cleanup error:', err)
          }
        }
        cleanup()
      }
      setIsConnected(false)
    }
  }, [dataItem.chatId])

  const renderData = () => {
    api.adminChatApi.getAllChatMessageApi(dataItem.chatId).then((rs) => {
      const formattedMessages = rs.map(msg => ({
        id: msg.messageChatDetailsId,
        text: msg.messageContent,
        time: msg.sentAt,
        sender: msg.senderType === "2" ? 'user' : 'bot'
      }))
      setMessages(formattedMessages)
    }).catch(() => {

    })

  }

  const handleFormOpened = () => {
    renderData()
    if (typeModal === "Edit") {
      if (dataItem) {
        Object.entries(dataItem).forEach(
          ([name, value]) => {
            setValue(name, value)
          }
        )
      }
    }
  }


  const handleModalClosed = () => {
    clearErrors()
    reset()
    setDataItem({})
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || !connection) return

    try {
      console.log('Sending message...')
      const messageData = {
        chatId: dataItem.chatId,
        messageContent: inputMessage,
        senderType: "2"
      }

      // Send message via API
      await api.adminChatApi.sendMessageApi(messageData)
      console.log('Message sent to API')

      // Send via SignalR
      // if (isConnected) {
      //   await connection.invoke('SendMessage',
      //     dataItem.chatId.toString(),
      //     dataItem.chatId.toString(), // Use chatId as senderId
      //     inputMessage
      //   )
      //   console.log('Message sent via SignalR')
      // }

      setInputMessage('')
    } catch (err) {
      console.error('Error sending message:', err)
      notificationError('Gửi tin nhắn thất bại')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-dialog-centered modal-lg'
      onOpened={handleFormOpened}
      onClosed={handleModalClosed}
    >
      <ModalHeader toggle={handleModal}>
        {t('Chi tiết hội thoại')}
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col h-[600px] bg-white rounded-xl">
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && <Bot className="w-6 h-6 text-primary" />}
                <div className="flex flex-col">
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[70%] ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                  >
                    {msg.text}
                  </div>
                  <span className={`text-xs text-muted mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(msg.time)}
                  </span>
                </div>
                {msg.sender === 'user' && <User className="w-6 h-6 text-secondary" />}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('Nhập tin nhắn...')}
                  className="w-full"
                />
              </div>
              <Button
                color="primary"
                onClick={handleSendMessage}
                className="rounded-full p-2 flex-shrink-0 min-w-10 h-10"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ModalComponent
