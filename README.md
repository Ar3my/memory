# DOCKER NUXT / LUMEN / MYSQL Memory game !!!

## Build Setup and docker command

This project require DOCKER !

``` bash

# install project
$ yarn dev:build

# serve project after install
$ yarn dev:up

# down all container
$ yarn dev:down

# down containers and killall
$ yarn dev:killall

```

## Getting start

This project require DOCKER / Yarn / composer php

``` bash

## 1 we build docker environement
$ yarn dev:build

## 2 we install node app modules
# go into app folder
$ cd app/
# install node modules
$ yarn install
# quit api folder
$ cd ..

## 3 install php vendors with composer
# go into api folder
$ cd api/
# install node modules
$ composer install
# quit api folder
$ cd ..


# down all container
$ yarn dev:down

# down containers and killall
$ yarn dev:killall

```

For detailed explanation on how things work, check out [Docker docs](https://docker.com/) / [Nuxt.js docs](https://nuxtjs.org) / [Lumen docs](https://lumen.laravel.com/).
