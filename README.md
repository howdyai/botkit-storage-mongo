# botkit-storage-mongo

[![npm](https://img.shields.io/npm/v/botkit-storage-mongo.svg)](https://www.npmjs.com/package/botkit-storage-mongo)
[![David](https://img.shields.io/david/howdyai/botkit-storage-mongo.svg)](https://david-dm.org/howdyai/botkit-storage-mongo)
[![npm](https://img.shields.io/npm/l/botkit-storage-mongo.svg)](https://spdx.org/licenses/MIT)
[![bitHound Overall Score](https://www.bithound.io/github/howdyai/botkit-storage-mongo/badges/score.svg)](https://www.bithound.io/github/howdyai/botkit-storage-mongo)

A Mongo storage module for [Botkit](https://botkit.ai) that provides a simple
system for storing information about a `user`, a `channel`, or a `team`.

This project is an extension to [Botkit Core](https://github.com/howdyai/botkit),
a richly featured developer toolkit for building bots and conversational apps.

This module conforms to [Botkit's storage plugin convention](https://github.com/howdyai/botkit/blob/master/docs/storage.md).


## Usage

Just require `botkit-storage-mongo` and pass it a config with a `mongoUri` option. In addition, you may pass a `tables` parameter, which will create methods for accessing additional tables (other than user, channel and team) in your Mongo database.
Then pass the returned storage when creating your Botkit controller. Botkit will do the rest.

Make sure everything you store has an `id` property, that's what you'll use to look it up later.

```
var Botkit = require('botkit'),
    mongoStorage = require('botkit-storage-mongo')({mongoUri: '...', tables: ['optional','list', 'of', 'custom','tables', 'to', 'add']}),
    controller = Botkit.slackbot({
        storage: mongoStorage
    });
```

```
// then you can use the Botkit storage api, make sure you have an id property
var beans = {id: 'cool', beans: ['pinto', 'garbanzo']};
controller.storage.teams.save(beans);
controller.storage.teams.get('cool', function(error, beans){
    // do something with beans
});

```

You can also get all entries from a table or find a selected set depending on a parameters.

```
storage.users.all(function(error, users){
    // do something with users
});
```

```
storage.users.find({team_id: team_id}, function(error, users){
    // do something with users
});
```

As of 1.0.6, all functions also support Promise syntax:

```
storage.users.all().then(function(list_of_users) {

  // do something

});
```
