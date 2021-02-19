# Running the bot

**1. Install node.js on the server where the bot will be hosted.**

**2. Get a token.**

[Here](https://discordapp.com/developers/applications/)

**3. Create a new application and grab a token from the bot section.**

**4. Enable SERVER MEMBERS INTENT.**

**5. Get the invitation link from the oauth2 section and invite the bot to the server.**

**6. Put the token in settings.json file.**

```bash
{ 
"token" : "token_here" 
} 
```
**7. Run "node bot.js".**

# Commands

```bash
$ !addname name 
```

Kicks all users with "name" in their username, and when someone joins with "name" in their username they will be kicked instantly. 
Name can include more than 1 word.

```bash
$ !clearnames
```

Clears all names that you added.
