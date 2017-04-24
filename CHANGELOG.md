# 1.0.6

Add support for promises - all functions now return a promise which will resolve
with the results of the Mongo query.

# 1.0.5

Update monk to latest version

Add `.find()` method for all tables

Add optional `tables` parameter to constructor which allows access to other
tables in the mongo collection.
