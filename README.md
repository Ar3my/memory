# DOCKER NUXT / LUMEN / MYSQL Memory game !!!

## Build Setup and docker command

This project require DOCKER !

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

## 2 UP docker containers
$ yarn dev:up

```

>/!\ use "docker ps -a" to check if all containers are up.

``` bash
## 3 install php vendors with composer
$ yarn dev:apiInstall

## 4 migrate database
$ yarn dev:apiMigrate
```
## Play memory !
View api scores on [localhost:8081/api/scores](https://localhost:8081/api/scores)
View app to play memory on [localhost:8080](https://localhost:8080)

## Use yarn command to down or flush containers

``` bash
# down all container
$ yarn dev:down

# down containers and killall
$ yarn dev:killall

```

## All yarn commands

``` bash

# install project
$ yarn dev:build

# serve project after install
$ yarn dev:up

# down all container
$ yarn dev:down

# down containers and killall
$ yarn dev:killall

## 3 install php vendors with composer
$ yarn dev:apiInstall

## 4 migrate database
$ yarn dev:apiMigrate

```

For detailed explanation on how things work, check out [Docker docs](https://docker.com/) / [Nuxt.js docs](https://nuxtjs.org) / [Lumen docs](https://lumen.laravel.com/).
