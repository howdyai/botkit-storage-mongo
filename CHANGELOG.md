# 1.0.7

Upgrade Monk database library to latest version [PR #27](https://github.com/howdyai/botkit-storage-mongo/pull/27)

Update save to use findOneAndUpdate instead of deprecated method [PR #25](https://github.com/howdyai/botkit-storage-mongo/pull/25)

Add error logging for failed DB connect [PR #26](https://github.com/howdyai/botkit-storage-mongo/pull/26)


# 1.0.6

Add support for promises - all functions now return a promise which will resolve
with the results of the Mongo query.

# 1.0.5

Update monk to latest version

Add `.find()` method for all tables

Add optional `tables` parameter to constructor which allows access to other
tables in the mongo collection.
