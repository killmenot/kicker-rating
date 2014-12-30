#!/bin/sh

dropdb -U postgres rating
createdb -E utf8 -U postgres rating
