import type { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy'
import { Message } from 'telegram-typings'
import { commandDispatcher } from './modules/commands/commandDispatcher'

const handle: APIGatewayProxyHandler = async (event: any) => {
  try {
    const { message } = JSON.parse(event.body)
    const response = await commandDispatcher(message as Message)
    return {
      body: JSON.stringify(response),
      statusCode: 200,
    }
  } catch (error) {
    return {
      body: JSON.stringify({ reason: error.message }),
      statusCode: 500,
    }
  }
}

export { handle }
