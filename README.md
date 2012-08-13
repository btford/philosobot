# Philosobot

IRC bot that contributes to conversations by providing (usually) appropriate philosophical quotations.

## Running the bot

Install the dependencies with npm:

    npm install

Write a `config.json` file based on the `config.default.json` template.

To start the bot, run:

    node bot.js

## Interacting with the Bot

In any channel the bot is in, mention its name and one of the many topics (check the `quotes` directory for a comprehensive list of examples). For instance:

    [03:28] bford: philosobot, what do you have to say about technology?
    [03:28] philosobot: Alice Kahn once said "For a list of all the ways technology has failed to improve the quality of life, please press three."

If philosobot cannot find a topic when you mention him/her (you get to decide the gender of your own philosobot), he/she will do his/her best to come up with something useful anyway. For instance:

    [03:28] bford: philosobot
    [03:28] philosobot: Not sure if this is relevant, but H. G. Wells once said "Human history becomes more and more a race between education and catastrophe."

Indeed, philosobot.

## Scraping for Quotes

Run:

    node master.js

Warning: This is resource intensive because the parser builds up a headless DOM and parses it with jQuery selectors. Sorry for being lazy :(
