## Overview of application

This is the frontend portion of an application that allows a user to interact with a database that stores information about toppings and pizzas. Specifically, they are able to read, update, create and delete records from said database.

From the home page, you can go to two other pages: the toppings page and the pizzas page. The toppings page allows the user to view what toppings are stored in the database as well as delete them if they wish. From the toppings page, they can also be redirected to two pages that allow the user to edit the name of a given topping or create a new one if they press the corresponding buttons. Similarly, the pizzas page allows the user to view the pizzas stored and delete them at will. It also leads to two other pages that allow the user to edit an existing pizza or create a new one.

## How to build, test, and run the application locally

To build, test, and run the application locally, you must first install its dependencies. First, open a terminal and navigate to the vite-project directory. Afterwards, run the following command on the terminal to install the dependencies: 

```
npm i
```

After installing the dependencies, you can run the application by running the following command in the same terminal as before: 

```
npm run dev
```

 Note the local host URL it gives you in the terminal and open it up in a web browser. Although, the home page of the website will open up with no problems, unfortunately if you try to use the other pages, it will give you a CORS error. The backend of the application only allows certain origins to reach the database for security purposes, so you will have to run the backend code locally and make some adjustments to the backend code as well to be able to fully test the application locally.

The first step to making those necessary adjustments is to also install its dependencies after downloading the backend project. Like before, you can install them with 

```
npm i
```

 in the terminal, but this time in the root directory. Afterwards, open up the allowedOrigins.js file and add the local host URL the frontend gave you to the array of allowedOrigins. Next, go to the corsOptions.js file and change line 5 to 

```
if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
```

 This will allow the application to recognize the local host the frontend is hosted on and stop giving CORS errors. 
 Now there is one last thing you need to do before you can run the backend server. It connects to the database through a database URI, which would normally be hidden, but since this is an exercise, create a .env file and copy and paste the following into it.

```
 DATABASE_URI=mongodb+srv://guest:Gv9NtRd7whCNzodf@testing.zt52h.mongodb.net/seExercise?retryWrites=true&w=majority&appName=Testing
```

 You can now run the backend server locally by running the following command in the terminal: 
 
 ```
 npm start
 ```

However, you'll notice the frontend still doesn't quite work and that's because you need to change all of the URLs in api.js to the local host the backend is running off of. When you replace the original URL with the local host one, the code should end up looking like so everytime it comes up:

```
res = await fetch("http://localhost:4500/toppings", requestOptions)
```

(Make sure the http part is included because it will not correctly connect otherwise.) After making all of your changes, you should now be able to run the frontend and backend at the same time to test out the full application.

## Technical Choices

For my technical choices, I chose to use loaders and suspense together because when the user clicked on a page that needed to retrieve data before displaying it, I wanted them to be able to wait on that page and see it say that it was loading instead of constantly pressing the button to that page over and over again while waiting if they get impatient, since that would just keep resending the request to retrieve data instead.

For the edit and add pages for both toppings and pizzas, I also chose to have the error message come directly from what the failed request sends back, since I thought it would better to have one source of truth regarding what a particular error means instead of having frontend try to figure it out and put a temporary message based on status codes when backend could refactor and change what it means at any time.

Lastly, for pizza's add and edit page, I had them both load in the current toppings because rather than allowing the user to put whatever toppings they wanted and having to update the toppings collection to match, I found it best to just restrict what they can choose to the ones already currently available to keep the requests consistent with what is already in the database without having to adjust for edge cases of unknown toppings.