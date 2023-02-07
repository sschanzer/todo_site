# Todo App

This application will allow user to `create` new events, `read` pending or incomplete events, `update` existing events, and `delete` events.

## Run Locally

Clone the project

`git clone https://github.com/sschanzer/todo_website.git`

Checkout the current branch

`git checkout TODO-001`

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
Or rename the .env.example file to .env and copy/paste your Django key from backend/backend/settings.py

Create your postgreSQL database
`createdb todo_db`

Make migrations and migrate the models into the database

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

### Running the Tests

In the backend directory, run the following::

`python manage.py test todo_app/tests`
