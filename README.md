# Archimydes Frontend Code Challenge
## Georgina Hoagland

### Setup

This requires node v12.16.1 or higher and npm.

Once you have installed packages with `$ npm install`, the code can be run with `$ npm start` and the application will be served at [http://localhost:3001](http://localhost:3001).

The backend mock API can be found at https://github.com/Archimydes/coding-challenge-mock-api/blob/master/frontend-coding-problem.md


### Notes
While we do have a mock backend, there is no way for any stories to be edited once created. When a user creates a story, while there are inputs for the cost and estimated hours, the POST route does not accept those parameters. Thus, these properties will always be created with the default values and not the users.

Similarly, as the admin marks stories as accepted or rejected, these changes are only held in the redux store and are not persisted so there is no way for a non-admin user to see a story's status.

Within the time frame and existing API setup, there are some issues I did not get to address:

  - Styling - while I used Semantic UI for ease of styling with responsive design, I did not get to add much detail so the UI is minimalist.
  - Security - as there is no way to reauthenticate a user, information is stored on localStorage to persist locally, including the user role.
  - Accessibility and testing - I did not have time to check if all of my pages for accessibility of all features or to test my components and redux store.
  - Logout and smoother navigation.
  - I assumed that Admins should also be allowed to create a story.

  
