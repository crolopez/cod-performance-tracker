[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/crolopez/cod-performance-tracker)

# COD PERFORMANCE TRACKER

Telegram bot to report on your and your friends' performance in Call of Duty Cold War.

## How to deploy

Just execute:

``` bash
yarn install # First time only
yarn build # First time only
yarn start
```

## Configure

To configure the tracker you have edit the `.env` file, replacing the default values by the desired ones.

| Field | Description |
|-|-|
| TELEGRAM_BOT_KEY | API key from your Telegram bot |
| REPORT_EMPTY_DAYS | If the non played days will be notified `(not implemented)` |
| USERS_TO_REPORT | List of users to be analysed in the following format: `User1#111,User2#222` |

Example:

``` bash
TELEGRAM_BOT_KEY=129238594:AAF5Safasfj899824781l8asdaszZ3
REPORT_EMPTY_DAYS=true
USERS_TO_REPORT=Zelopec#232548,SneezyDwarf#2155284
```

## Execute periodic reports

TODO