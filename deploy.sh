#!/bin/bash
if [ $# -eq 1 ]
  then msg="$1"
fi

git add .
git commit -m  "$msg"
git push
git push heroku
heroku logs --tail
