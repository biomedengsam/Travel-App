# Travel Planner
Udacity FEND- Capstone Project

## Project Description:
 This project is a travel app that allows users to plan their trips, the user will start by adding the location and dates of their trip.<br>
 With the use of 5 API's the details that will be displayed:
1. The weather (current/forecast) at the time of the trip (which is only limited for 16 days in the future)
2. Destination info (region, country, capital, population, currencies, languages)
3. Departure and return dates
4. Days left before departure date
5. Duration of the trip
6. An image of the destination
Also, the app allows the user to add multiple destination/cities.And the data will be stored in local storage

## Project technologies and tools:
- Webpack
- Node.js
- Express
- Html
- CSS
- Sass
- JavaScript
- Service workers

### Api used list:
1. Geonames
2. Weatherbit 16 Day Weather Forecast API
3. Weatherbit Current Weather API
4. Pixabay
5. REST Countries API
## Project Setup
Follow the instructions below to setup the project locally.
### API credentials needed
Acquire credentials for the following Apis and save them in .env file in the main directory
* user_name = Geonames username
* weatherApi = Weatherbit API KEY
* pixabayKey = Pixabay API KEY

### Install Dependencies
Run the following command:

```npm install```
### Bundle modules
Run the following command if you want to bundle the modules for production:

```npm run build``` <br>
or in development mode:

```npm run dev```
### Running the server
Run the following command to run the server:

```npm start```
### Running the tests
Run the following command to run the server:

```npm run test```

**Note for the reviewer** in this app i used the current weather api if the trip is within 7 days, and forecast api if it was more.
Extend your Project Further implemented in this app:
- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results
- Integrate the REST Countries API to pull in data for the country being visited.
- Allow the user to remove the trip.
- Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
- Incorporate icons into forecast.
- Allow the user to add additional trips<br>
#### Below there is a video demonstration of the project<br>

<a href="https://youtu.be/1nR4--cnbC4
" target="_blank"><img src="http://img.youtube.com/vi/1nR4--cnbC4/0.jpg" 
alt="project link" width="500" height="300" border="10" /></a>

