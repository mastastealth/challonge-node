# challonge-node-ng

A [fork](https://github.com/alanhhwong/challonge-node) of a node.js library for [Challonge API](http://api.challonge.com/v1).

## Requirements
Tested with:
* Node 8.7.0
* npm 5.5.1

### Installation
```js
npm install challonge-node-ng
```

### Usage
See tests for full usage

#### Setup
```js
var ChallongeAPI = require('challonge-node-ng');
var challonge = ChallongeAPI.withAPIKey(<API_KEY>);
```
or
```js
import ChallongeAPI from 'challonge-node-ng';
const challonge = ChallongeAPI.withAPIKey(<API_KEY>);
```

#### Create tournament
```js
challonge.tournaments.create(<NAME>, <URL>).then(function(tournament) {
  console.log(tournament.id);
}
```

## Testing
```js
npm run test
```

## License

challonge-node-ng is available under the MIT license. See the LICENSE file for more info.
