# Fibonacci nth Number Calculation

This project consist of three Docker containers:
* fibonacci.db: Mysql database image container with volume fibonacci_dbdata for persistence
* fibonacci.ui: Angular frontend for the app
* fibonacci.api: REST api for the calculation and read of numbers

# Run this project

## Requirements
Docker must be installed in your system in order to get the containers up

## Run the containers
The project have in the root a docker-compose.yml which is the definition of the running system. It will create the before mentioned containers and initialize the database with
the required tables.

To get it running, just go to the root folder of the solution and execute:
```
docker compose up -d
```

### Stop the containers
To stop the containers, just execute the following command in the root folder of the project:
```
docker compose down
```

### Delete the volume
To delete the created volume for the data, just runthe following command:
```
docker volume rm fibonacci_dbdata
```

