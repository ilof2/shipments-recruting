# How to run

1. Install poetry `python -m pip install poetry`
2. Install all dependencies `poetry install`
3. Active poetry shell: `poetry shell`
4. Do migrations: `./manage.py migrate`
5. Run project `./manage.py runserver`

## How to add new API endpoints

1. Move in directory with `manage.py` file: `cd backend/shipments_manager`
2. Create app directory: `mkdir ./api/{your_app_name}`
3. Start new app: `./manage.py startapp {your_app_name} ./api/{your_app_name}`
4. Add your app to the django settings:

    ```python
        ...
        "django.contrib.staticfiles",
        "api.{your_app_name}",
        ...
    ```

5. Include all your app urls in main api urls.py. Example: `path("newapp/", include("api.{your_app_name}.urls"))`
