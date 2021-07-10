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
| USER_ALIAS `(optional)` | Allows you to configure several aliases to avoid using the full user ID. Format `alias1=user1#ID1,alias2=user2#ID2` |

Example:

``` bash
TELEGRAM_BOT_TOKEN=129238594:AAF5Safasfj899824781l8asdaszZ3
USER_ALIAS='alex=TableKiller#8789,roberto=fisherman#1691'
```

## Commands

| Command | Description |
|-|-|
| `/report <user>` | Create a simple report on the specified user. |
| `/detailed_report <user>` | Create a detailed report on the specified user. |
| `/version` | Get the bot version. |

## Execute periodic reports

TODO
