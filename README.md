# N-Body Simulation

You can try it here: https://n-body-simulation-cb6d1.web.app/

https://github.com/user-attachments/assets/cda9278e-4e5b-4d44-b580-4195bc6c0c40

## Descripton

This application allows you to visualize and interact with a dynamic simulation of multiple celestial bodies influenced by gravitational forces. Built with TypeScript, this app provides a user-friendly interface to explore the complex behaviors of n-body systems.

## Features

- Real-time Simulation: Watch the bodies interact in real-time as they move under gravitational forces.
- Customizable Parameters: Adjust the number of bodies, their masses, initial positions, velocities, simulation speed and gravitational force.
- Interactive Interface: Drag to pan and scroll to zoom in and out to explore different regions of the simulation.
- Template Orbits: Choose from a list of pre-designed templates showcasing aesthetically pleasing n-body orbits.

### Deployment

This project is hosted on Firebase. Everytime there is a change on the master branch, Github Actions will automatically trigger a re-deploy.

### Technical details

The app was implemented using Typescript. The simulation is rendered on an HTML canvas, without the use of third party libraries.

### Developing

To develop locally, simply clone the repo and run `npm start`
