# Contribute to JobTriage 🤝

Contributions are always welcome. Try out **Job Triage** and create issues that you think to be addressed. You can also go through our issues and start working on any of the issue. 

To get started on working on an issue, just comment that you will be working on it. If you have any doubts, just ask in the commnt section. we are always happy to help :)

To make this easier, some of the issues are marked as [good first issue](https://github.com/jobtriage/jobtriage/issues?q=is:open%20is:issue%20label:%22Good%20First%20Issue%22) that contain bugs which have a relatively limited scope and will help you get your feet wet and get you familiar with our contribution process. 

We request you all to follow the design guidelines given [here](/DESIGN_GUIDELINES.md).

**Note: Do not open a github issue if you find a security vulnerabilty,** Instead send a mail to jobtriage@gmail.com and we willl look into it.

## Setting up the backend 
- Install the gems using `bundle install`
 - Start mongodb server in local as you prefered
 - Start server using `rails s`
 - Test server using `rails test`
 - Check the [API doc here](https://documenter.getpostman.com/view/3705194/SzKWuxaB?version=latest)

### Mail Verification
  - By default emails will be verified in local setup. If you want to test  this functionality, Create a n file `config/application.yml` 
  - Add the following lines 
  ```yml
  notification_email: 'username@gmail.com'
notification_password: 'yourpassword'
HOST_URL: 'http://localhost:3000'
USE_EMAIL_VERIFICATION: 'true'
  ```
  - Update the username and password


Note: You can find mongodb server details in `/config/mongoid.yml`. You don't have to change anything in that file.

## Setting up the frontend
Run the following comands.

 - `cd frontend`
 - `yarn install`
 - `yarn start`
 -  Open http://localhost:3001 or any port at which React starts.


**If you face any issues during setup/ If you think this doc needs improvement, Kindly raise an issue or PR** 

### Thanks! :purple_heart: 