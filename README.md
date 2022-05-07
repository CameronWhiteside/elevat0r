# Elevat0r

This single page React application introduces an simulation of a working elevator system with customizable floor and elevator bank counts. Users can create their own system based on custom specifications of speed, computing intervals, drop-off delays, and system size. After configuration, the user can see their system in action using the control panel of floor and elevator buttons.

![animated use of site with elevator configuration and testing](https://i.ibb.co/ys80KRj/elevat0r-preview.gif "Site Preview").


## Getting Started
This project can be run locally using `npm start` from the root directory. This repository is also live-hosted at [elevat0r.com](http://elevat0r.com)

## Technology Usage
Elevat0r was built with `Create React App` and utilizes React 18 with functional components in order to construct a single-page application. An elevator system can be created through controlled inputs, with a visualization updating live.

useState was used significantly throughout the application to manage state variables and re-render illustrations based on the users input for system design.

Data is preserved through Javascript composition of a single Systems class which is composed of several nested objects representative of Elevators, Floors, Buttons, Pickups, Requests, and Stop Lists.

Simple data model validations were done using the Jest framerwork.

Additional time to refactor code would result in better utilization of React:
* Elevator systems would be held within a useContext instance in order to prevent excessive prop drilling
* The asynchronous nature of updating elevator locations should be handled via React and integration of useEffect in elevator components. In this application, it was handled by VanillaJS DOM manipulation built directly into the data layer, which allowed for fast calculations, but violated React's best practices for design patterns.
