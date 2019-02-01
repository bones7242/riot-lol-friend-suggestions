# billbitt's RIOT API bot  #

This is a little node CLI that I made to do some simple queries against RIOT's api just for fun.

### Installation ###

1. clone the repo
1. run `npm install`
1. get an api key from [riot api](https://developer.riotgames.com)
1. create a copy of `config/config.js.example` as `config/config.js`
1. add your api key to the config file

### CLI Usage ###

```
$ node cli <command> <summoner name> <region>
```

### commands ###
#### 1. `favorite_champion` ####

This was my first command. I did a simple query to see which champion I had played with most.

example:
```
$ node cli favorite_champion bboness na1
```
#### 2. `suggest_friends` ####

This is the second command I am working on.  As a newer player who doesn't have a lot for friends who play league, I thought it would be fun to create a script that looks at my match history and suggests summoners that I should send friend requests too.  Right now the logic in this feature is extremely basic.  It looks at who you have played with and weighs them based on your winning or loosing together, but it could be really cool if it was enhanced to actually weigh potential friendships by using how you operated in game.

exampe:

```
$ node cli suggest_friends bboness na1
```

### To Do ###
I'd like to improve the friend finder by improving the criteria it uses to rank potential friends.  If you have any idea, create an issue on this repo. Exmaples:
  - whether you have played a lane together (i.e. one was sup)
  - add some weighting based on how recent you played with the other player (and how frequently recently)
  - eventually, something about your actual play styles/roles/interactions