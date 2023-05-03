# Social-Network-API

## Description

This is a back end social network web application where users can share their thoughts, react to friends’ thoughts, and add a friend or remove a friend from the list.


## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Questions](#questions)
- [License](#license)

## Installation

- Clone application [Social-Network-API](https://github.com/TerryKor/Social-Network-API)<br />

- To install necessary dependencies, run the following command:
```
npm i
```

- To run the app run the following command:<br />
```
node index.js
```

- To test API routes use [Insomnia](https://insomnia.rest/download)  or [Postman](https://www.postman.com/downloads/)<br />

API routes to Users:

- GET method `http://localhost:3001/api/users`    &nbsp;  to view all users<br/>

- GET method `http://localhost:3001/api/users/:userId` &nbsp; to view user by ID<br/>

- POST method `http://localhost:3001/api/users/`    &nbsp; to create user <br/>

- PUT method `http://localhost:3001/api/users/:userId` &nbsp;  to update user<br/>

- DELETE method `http://localhost:3001/api/users/:userId` &nbsp;  to delete user by ID<br/>

API routes to Thoughts:

- GET method `http://localhost:3001/api/thoughts/`    &nbsp;  to view all thoughts<br/>

- GET method `http://localhost:3001/api/thoughts/:thoughtId` &nbsp; to view thought by ID<br/>

- POST method `http://localhost:3001/api/thoughts/`    &nbsp; to create thought <br/>

- PUT method `http://localhost:3001/api/thoughts/:thoughtId` &nbsp;  to update thought by ID <br/>

- DELETE method `http://localhost:3001/api/thoughts/:thoughtId` &nbsp;  to delete thought by ID<br/>

API route to create Reaction:

- POST method `http://localhost:3001/api/thoughts/:thoughtId/reactions`    

API route to delete Reaction:

- DELETE method `http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId` 

API route to add a Friend:

- POST method `http://localhost:3001/api/users/:userId/friends/:friendId`    

API route to remove a Friend:

- DELETE method `http://localhost:3001/api/users/:userId/friends/:friendId` 


## Usage

You can see demonstration video [here](https://drive.google.com/file/d/1f5YmXKtZNCsHlSjoN8VKoJw1VQRBYuOb/view?usp=share_link)<br />


## Contribution

Application was created by Terry Kornienko and if you want to contribute send me email.<br />

## Questions

My Email:
[misterfreemann@gmail.com](mailto:misterfreemann@gmail.com)
My Github:
[TerryKor](https://github.com/TerryKor)

## License

![badge](https://img.shields.io/badge/license-MIT-blue)

