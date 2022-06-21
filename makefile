# HELP
# This will output the help for each task
.PHONY: help

help: ## This is the help task
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

ifndef INSIDE_DOCKER_CONTAINER
	INSIDE_DOCKER_CONTAINER = 0
endif

HOST_UID := $(shell id -u)
HOST_GID := $(shell id -g)
PHP_USER := -u www-data
PROJECT_NAME := -p ${COMPOSE_PROJECT_NAME}
OPENSSL_BIN := $(shell which openssl)
INTERACTIVE := $(shell [ -t 0 ] && echo 1)
ERROR_ONLY_FOR_HOST = @printf "\033[33mThis command for host machine\033[39m\n"

ifneq ($(INTERACTIVE), 1)
	OPTION_T := -T
endif


# Remove symbolic links
clean:
	@rm -f ./docker-compose.yml
	@rm -f ./Dockerfile

setup: ## Setup the development environment
	@ln -s docker/docker-compose.dev.yml docker-compose.yml
	@ln -s docker/dockerfile.dev Dockerfile

setup-prod: ## Setup the production environment
	@ln -s docker/docker-compose.prod.yml docker-compose.yml
	@ln -s docker/dockerfile.prod Dockerfile

build: ## Build the image
	@docker-compose build

up: ## Start the container
	@docker-compose up -d

start: ## Start the container
	@docker-compose start

stop: ## Stop the container
	@docker-compose stop

restart: ## Restart the container
	@docker-compose restart

down: ## Stop the container and remove all containers
	@docker-compose down

logs: ## Show the logs
	@docker-compose logs -f





