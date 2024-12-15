import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { BASE_URL } from '../api/constants'

export const createSignalRConnection = () => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken')
  )
  return new HubConnectionBuilder()
    .withUrl(`${BASE_URL}/chathub`, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build()
} 