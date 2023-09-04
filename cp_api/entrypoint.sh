#!/bin/sh

if [ "$SQL_ENGINE" = "postgresql" ]
then
    echo "Waiting for postgres..."
    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 1
    done
    echo "PostgreSQL started"
    sleep 1
fi

python manage.py migrate
python manage.py collectstatic --noinput

exec "$@"
