# yeet

**/!\ warning: discord may yeet your account in return if you use this, never had issues myself though**

automagically yeet ur old discord msgs

discord raised rate limits on their delete endpoints :c now can't just run socialnuke every once in a while, automated pruning is needed

## install

- get node: https://nodejs.org/en/download/
- [download zip](https://github.com/protospherical/yeet/archive/master.zip) (and unpack) or clone the repo
- open terminal, go to the script's directory
- run `npm install`

## config

- copy \_config/config.example.yml to \_config/config.yml and edit
- setting the token is necessary ("YOUR TOKEN GOES HERE")
- switch the "run" value from "once" to e.g. "at 1:20 am" (it uses ur local time) - see [this doc](https://breejs.github.io/later/parsers.html#text) for values
- you can use [this guide to get a token](https://github.com/Tyrrrz/DiscordChatExporter/blob/master/.docs/Token-and-IDs.md)

## use

**running with "run" set to "once" is recommended for the first time if you have a lot of messages**

**running on the same ip as your home network is also recommended, i had luck on a vps but wouldn't risk it**

- use whatever process manager you prefer, i use tmux, but screen or pm2 or forever should be fine
- make it run this: `npm run yeet` and keep it running in the background

## test

- set "run" to "once" in config
- run `npm run yeet` and see if it doesn't crash
