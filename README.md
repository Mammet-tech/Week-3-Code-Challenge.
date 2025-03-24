# Movie Ticket Booking App

## Description
This is a simple movie ticket booking web application that allows users to view movie details, check available tickets, and purchase tickets. The application fetches movie data from a local JSON server and dynamically updates the UI.

## Author
Edwin Mammet

## Setup Instructions
1. Clone this repository:
   ```sh
   git clone https://github.com/Mammet-tech/Week-3-Code-Challenge.git
   ```
2. Navigate to the project folder:
   ```sh
   cd Week-3-Code-Challenge
   ```
3. Install JSON server:
   ```sh
   npm install -g json-server
   ```
4. Start the JSON server:
   ```sh
   json-server --watch db.json --port 3000
   ```
5. Open `index.html` in your web browser.

## Features
- View a list of available movies.
- Check movie details including runtime, showtime, and available tickets.
- Buy tickets (updates available ticket count in real-time).
- Mark movies as sold out when tickets are no longer available.
- Delete movies from the list.

## BDD (Behavior Driven Development)
### 1. Displaying Movies
**Input:** User loads the page.  
**Output:** A list of available movies is displayed.

### 2. Viewing Movie Details
**Input:** User clicks on a movie title.  
**Output:** The movie details, including title, poster, showtime, runtime, and available tickets, are displayed.

### 3. Buying a Ticket
**Input:** User clicks the "Buy Ticket" button.  
**Output:** The available ticket count decreases. If no tickets are left, the movie is marked as "Sold Out."

### 4. Deleting a Movie
**Input:** User clicks the "Delete" button next to a movie.  
**Output:** The selected movie is removed from the list.

## Technologies Used
- **HTML** - Structure of the web pages.
- **CSS** - Styling and layout.
- **JavaScript** - Handles interactivity and data fetching.
- **JSON Server** - Provides a mock API for movie data.

## Contact Information
Email: edwinmammet19@gmail.com

## License
MIT License

```
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
```

