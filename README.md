# RecipeBook

This project was made for educational purpose only in order to build a single page application using Angular (Angular8).
It is the course project of the [Angular 8 - The complete guide](https://www.udemy.com/certificate/UC-KM7UA13O/) online course.

The recipe book application offers many services as:  
- Store, update and remove a recipe in/from data base (Fire base).    
- Display the recipe list stored in the database (Firebase).  
- Display the detail information of the selected recipe.  
- Add the chosen ingredient to the shopping list.  
- Modify or delete ingredient from the shopping list.  
- The user can sign up or sign in to the application.  

PS: The user must be authenticated in order to use the recipe book functionalities. 

## Prerequisites
This project use Fire base as backend server.

In order to run the application in your local machine, you have to: 
1. Create a fire base account in case you don't have one yet.  
2. Create a Fire base project. 
3. Create a Realtime data base for the project.
4. Configure email address / password for authentication mechanism:  
   * Activate only the first option which allow new users to subscribe with their email address and their password.
5. Install the project: 
   * git clone https://github.com/abenamor9/recipe-book.git  
6. Navigate to the project and install dependencies:   
    * cd recipe-book  
    * npm install  
7. In the environment.ts file:   
    * Add your fire base API key (You will find it at your project setting): It will be used in order to sign in or sign up by a user.   
    * Add the base URL for your project in order to store data. You will find it at the data base section of your project.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Fire base Hosting
Steps to do in order to host the project at Fire base host (a static host):  
1. ng build --prod
2. npm install -g firebase-tools
3. firebase login
4. firebase init
5. firebase deploy

## YouTube video
Here is a descriptive video in which I demonstrate a full user story:
[Recipe book](https://youtu.be/sZd5GipvDb0)
