# COD PERFORMANCE TRACKER

Telegram bot to report on your and your friends performance in Call of Duty Cold War.

## How to deploy

The project has been prepared to run in a serverless environment. You can get an idea of what you need to deploy it by checking `config.yml` and `serverless.yml` files.

However, if you want to deploy it locally, or in a non-serverless environment, just run the following commands:

``` bash
yarn install
yarn build
yarn start:local
```

## Configure

To configure the tracker you have to create a `.env` file and add the following values:

| Field | Description |
|-|-|
| TELEGRAM_BOT_TOKEN | API token from your Telegram bot |

Example:

``` bash
TELEGRAM_BOT_TOKEN=129238594:AAF5Safasfj899824781l8asdaszZ3
```

## Commands

| Command | Description |
|-|-|
| `/report <user>` | Create a simple report on the specified user. |
| `/detailed_report <user>` | Create a detailed report on the specified user. |
| `/version` | Get the bot version. |

## Execute periodic reports

TODO
