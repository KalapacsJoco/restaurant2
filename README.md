# Online Restaurant Ordering Platform

This multilanguage application is a Laravel and React-based web platform that allows customers to place food orders online. It includes an admin interface for managing dishes and users and provides a modern user experience powered by Tailwind CSS.

## Technologies Used
- **Laravel**: Backend framework.
- **React**: Frontend interface.
- **Docker**: Containerized environment execution.
- **SQLite**: Lightweight and portable database.
- **Tailwind CSS**: Clean and responsive styling.

## Key Features
- Online food ordering capability.
- User login and registration.
- Admin interface for adding, editing, and managing dishes.
- Multilingual Support: The platform supports multiple languages (Hungarian, English, Romanian) to cater to a wider audience.

## Installation Guide (Docker)
The project can be easily downloaded from Docker Hub using the following commands:

- docker pull kalapom/etterem-frontend:latest
- docker pull kalapom/etterem-backend:latest

Run the frontend and backend locally using Docker with these commands:

- docker network create etterem-network
- docker run -d --name backend --network etterem-network -p 8000:8000 kalapom/etterem-backend:latest
- docker run -d --name frontend --network etterem-network -p 5173:5173 kalapom/etterem-frontend:latest

**Note:** The Play with Docker platform uses dynamically generated URLs and ports, which are not compatible with the project configurations. Therefore, it will not work correctly on this platform. However, the system runs without issues in any Docker-supported environment, such as Docker Desktop.

## Test Users

The following administrator and user credentials are provided exclusively for testing the system:

- Administrator:
  - **Email:** sasa@gmail.com
  - **password:** 123

- User:
  - **Email:** sanyi@gmail.com
  - **password:** 123

New users can also register.

## Known Issues
- In the Docker containerized version, the CreateDish feature does not upload images. A fix is under development.

## Future Plans
- **Responsive Design:** Implementing a mobile-friendly layout using Tailwind CSS.
- **Notifications:** Integrating automatic email notifications for order statuses (e.g., order confirmation).

## Demo images

![Dishes](./screenshots/dishes.PNG)
![Admin Interface](./screenshots/admin.PNG)
![Order interface](./screenshots/order.PNG)

