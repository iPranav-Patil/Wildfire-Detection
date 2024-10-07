# Global Wildfire Tracker

The **Global Wildfire Tracker** is a React-based project that visualizes active wildfires around the world using the NASA EONET API and a map service. The application displays wildfire locations on an interactive map, and users can click on markers to get more information about each wildfire event.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Information](#api-information)
  - [NASA EONET API](#nasa-eonet-api)
  - [HERE Maps API](#here-maps-api)
- [Getting an API Key](#getting-an-api-key)
  - [NASA EONET API Key](#nasa-eonet-api-key)
  - [HERE Maps API Key](#here-maps-api-key)
- [Environment Variables](#environment-variables)
- [Project Setup](#project-setup)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The **Global Wildfire Tracker** application uses NASA's Earth Observatory Natural Event Tracker (EONET) API to retrieve current wildfire events. The application then displays these events on an interactive map using the HERE Maps service, allowing users to see where wildfires are occurring and get additional information about each event.

## Features

- Fetches and displays real-time wildfire data from NASA EONET.
- Uses HERE Maps to render an interactive map with markers indicating wildfire locations.
- Shows additional details about each wildfire, including the name, start date, and coordinates.
- Responsive design suitable for desktop and mobile views.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Mapping Service**: HERE Maps
- **API**: NASA EONET API
- **Environment Management**: `.env` file for storing API keys

## API Information

### NASA EONET API

The NASA EONET (Earth Observatory Natural Event Tracker) API provides data on natural events such as wildfires, hurricanes, and more. This project specifically uses the wildfire data from this API.

- **API Base URL**: `https://eonet.gsfc.nasa.gov/api/v2.1/events?category=wildfires`
- **Category Used**: `Wildfires`
- **Data Provided**: The API returns a list of active wildfires with details like coordinates, event name, and start date.

### HERE Maps API

HERE Maps provides a comprehensive suite of location services and mapping capabilities. In this project, it is used to render an interactive map and place markers based on the wildfire coordinates.

- **Service Used**: `Map Display`
- **Documentation**: [HERE Maps API Documentation](https://www.here.com/docs/bundle/maps-api-for-javascript-developer-guide/page/README.html)

## Getting an API Key

### NASA EONET API Key

The NASA EONET API does not require an API key to access its endpoints. You can directly use the API URL to fetch data without additional authentication.

### HERE Maps API Key

To use HERE Maps in your project, you need to obtain an API key:

1. Sign up or log in at [HERE Developer Portal](https://platform.here.com/portal/).
2. Create a new project and get your API key from the dashboard.
3. Copy the API key and save it in the `.env` file of your project as shown below.

## Environment Variables

To manage sensitive information like API keys, the project uses a `.env` file. Create a `.env` file in the root directory of your project and add the following content:

```bash
VITE_MAPS_API_KEY=your_here_maps_api_key
VITE_WILDFIRE_NASA_API=nasa_api_url
```

> **Note**: The `.env` file should be added to `.gitignore` to prevent exposing sensitive information.

## Project Setup

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/global-wildfire-tracker.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd global-wildfire-tracker
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Create the `.env` file**:

   Create a `.env` file in the root directory with the following content:

   ```plaintext
   VITE_MAPS_API_KEY=your_here_maps_api_key
   VITE_WILDFIRE_NASA_API`= nasa_api_url(I used eonet)
   ```

   > **Note**: Replace `your_here_maps_api_key` with your actual API key from HERE Maps and `VITE_WILDFIRE_NASA_API` with the NASA API Link.

5. **Run the Project**
   ```bash
   npm run dev
   # or
   yarn dev
   ```


The project should now be running at [http://localhost:5173](http://localhost:5173) (or the specified port). Open this URL in your browser to see the application.

## Contributing

If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push the changes to your forked repository: `git push origin feature-name`.
5. Create a pull request describing your changes.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the project as long as you include proper attribution to the original authors.
