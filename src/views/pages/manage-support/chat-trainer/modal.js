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
    formState: {  }
  } = useForm({ defaultValues, resolver: yupResolver(formSchema) })

   const [messages, setMessages] = useState([])
   const [inputMessage, setInputMessage] = useState('')
   const messagesEndRef = useRef(null)

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
            if (name === 'calories') {
              setCaloriesValue(value)
            }
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

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return

    const payload = {
      chatId: dataItem.chatId,
      messageContent: inputMessage
    }

    api.adminChatApi.sendMessageApi(payload).then(() => {
      // Sau khi gửi tin nhắn thành công, gọi lại API lấy toàn bộ tin nhắn để cập nhật
      renderData()
      // Clear input
      setInputMessage('')
    }).catch((err) => {
      console.error('Lỗi khi gửi tin nhắn:', err)
    })
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

          <div className="p-4 border-t flex items-center">
            <Input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('Nhập tin nhắn...')}
              className="flex-grow mr-2"
            />
            <Button 
              color="primary"
              onClick={handleSendMessage}
              className="rounded-full p-2"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ModalComponent
