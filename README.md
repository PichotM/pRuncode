# pRuncode
React app using Monaco to run code in JS/Lua for fivem

# Installing
- Download the resource
- Drop everything in a folder called `pruncode` in your `resources` folder.
- Start the resource

# Configuration
- How to open the menu?<br>
Just type /runcode2 or press F5 (default key)
- How to change the shortcut key?<br>
The bind is set in `client/client.lua`
- How to give people/me access to the menu?<br>
In your server/whatever.cfg add this:
```
# if you are using groups
add_ace group.admin runcode2 allow
# if you are not using groups with your steam/rockstar/fivem identifier
add_ace identifier.steam:110000105c967cf runcode2 allow
```
You can also edit the script if you use your own permission system.

# Next features
- Autocompletions
- Snippets etc..
- C# maybe

# Preview
![preview](https://i.imgur.com/QPvLcNv.png)