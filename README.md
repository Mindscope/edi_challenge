# EDirectInsure Coding Challenge

This document provides an insight into the implementation of the EDirectInsure Coding Challenge.

This challenge consists on the creation of a multi-user task manager web application. 

The application should include the following features:
1. User Registration
2. User Authentication (login/logout)
3. Visualize, add, edit and remove user projects
4. Visualize, add, edit and remove tasks associated with the projects

# Analysis

One non functional requirements is to develop the application using Javascript,  with the backend in Node.js or GoLang and the frontend using a framework of my choice. 

## Backend

The choice made was to go with Node.js using the MEN stack. Having little experience in developing backend logic using Node.js I chose a stack which provided good documentation and community support to speed the development. 

Express.js is used to serve the API endpoints and used the `mongoose` package to connect to the MongoDB database.

The API is structured using RESTful principles, interpreting every project and task as a resource, having specific endpoints for each. The tasks are properties of each Project as they are nested within them, as a model and on the API endpoints. Users are handled through the auth endpoints.

The API url structure is as follows:
* Projects `http://localhost:8081/api/projects`
* Tasks `http://localhost:8081/api/projects/:projectId/tasks`
* Users 
    * Login `http://localhost:8081/api/auth/login`
    * Register `http://localhost:8081/api/auth/register`

## Frontend

For the frontend the selected framework was Svelte. This choice was due toa previous development experience and the desire to further explore this technology.

Svelte transpiles the source files into final state ones, in this case using `rollup` for the build phase.

The framework structures all view artifacts within a render tree, where we have a root node, the `App`, and within that root node we can inject different components to form our template. In this case we have a `Home` component that shows all projects, that are `Project` components, and allow to create projects through the `CreateProject` component. Inside each `Project` we have task instances, that are `Task` components.

With Svelte we can export each of these components into Web Components, but that was not made in this implementation.

# Deployment

 For development purposes Docker containers were created, to insure immutable environments, ease of deployment and dependency management. This way we can deploy the api and database services as well as run an Http server to serve the frontend files.
 
 To test the application we run

 ```
 docker-compose up
 ```

 Currently the configured test urls are:

 * API - `http://localhost:8081`
 * APP - `http://localhost:5000`

# Notes

An important note is that no Unit tests were made. This is due my lack of experience configuring and performing tests using these stacks.

Some tests were made using Jest and Jasmine.

