import axios from 'axios'
import { getConfig } from './config'

const telegramAPI = 'https://api.telegram.org/bot'
const botKey = getConfig().TELEGRAM_BOT_TOKEN

export async function sendMessage(chatId: string, message: string): Promise<string> {
  const response = await axios.post(`${telegramAPI}${botKey}/sendMessage`,
    {
      chat_id: chatId,
      text: message,
      parse_mode: 'markdown',
    }
  )
  return response.data
}
