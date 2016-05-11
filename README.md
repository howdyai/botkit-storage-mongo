# botkit-storage-mongo

A Mongo storage module for Botkit.

## Usage

Just require `botkit-storage-mongo` and pass it a config with a `mongoUri` option.
Then pass the returned storage when creating your Botkit controller. Botkit will do the rest.

Make sure everything you store has an `id` property, that's what you'll use to look it up later.

```
var Botkit = require('botkit'),
    mongoStorage = require('botkit-storage-mongo')({mongoUri: '...'}),
    controller = Botkit.slackbot({
        storage: mongoStorage
    });
```

```
// then you can use the Botkit storage api, make sure you have an id property
var beans = {id: 'cool', beans: ['pinto', 'garbanzo']};
controller.storage.teams.save(beans);
beans = controller.storage.teams.get('cool');

```
