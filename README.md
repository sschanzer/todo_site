# Todo App

This application will allow user to `create` new events, `read` pending or incomplete events, `update` existing events, and `delete` events.

## Run Locally
Clone the project 

```git clone https://github.com/sschanzer/todo_website.git```

Checkout the current branch

```git checkout django_setup```

Create and run a virtual environment

```
# CREATE
python -m venv .venv 

# RUN
source .venv/bin/activate
```
cd into project directory 

`cd backend`

Install Dependencies 

`pip install -r requirements.txt`

Create .env file with `SECRET_KEY` from backend/settings.py

```
# Creates the .env file
touch .env

# Open window to edit file
code .env

# Put the following into .env
SECRET_KEY = your django secret key
```

Create your postgreSQL database
`createdb todo_db`

Make migragtions and migrate the models into the database
```
# Makes migrations
python manage.py makemigrations

# Migrates 
python manage.py migrate
```
Load the data into the database
`python manage.py loaddata data.json`

Run the server
`python manage.py runserver`


### Environment Variables

To run this project, be sure to add your secret key in .env

`SECRET_KEY = your django SECRET_KEY` from backend/settings.py

### Runing the Tests 

To run the tests after cloning the repo and creating your .env file with your secret key included, cd into backend and run the following:

`python manage.py test todo_app/tests`





