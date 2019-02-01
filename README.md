# billbitt's RIOT API bot  #

This is a little web app I made to use RIOT's api to make friend suggestions based on a summoner name.

### Installation ###

1. clone the repo
1. run `npm install`
1. get an api key from [riot api](https://developer.riotgames.com)
1. create a copy of `config/api-key.js.example` as `config/api-key.js`
1. add your api key to the config file
1. start server with `nodemon server`
1. visit `localhost:3000` in your browser

### Notes ###

As a newer player who doesn't have a lot for IRL friends who play League, I thought it would be fun to create a script that looks at my match history and suggests summoners that I could send friend requests too.  Right now the logic in this analysis is extremely basic.  It looks at who you have played with and weighs them based on your winning or loosing together, but it could be really cool if it was enhanced to actually weigh potential friendships by making more judgements about you and your teammates based on how you operated in each game.

### To Do ###
front end:
  - could use a lot of work

back end:
  - I'd like to improve the friend finder by improving the criteria it uses to rank potential friends.  If you have any idea, create an issue on this repo. Examples:
  - whether you have played a lane together (i.e. one was sup)
  - add some weighting based on how recent you played with the other player (and how frequently recently)
  - eventually, something about your actual play styles/roles/interactions

