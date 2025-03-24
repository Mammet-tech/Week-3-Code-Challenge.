const baseURL = "http://localhost:3000/films";

document.addEventListener("DOMContentLoaded", () => {
  loadFirstMovie();
  loadAllMovies();
});

function loadFirstMovie() {
  fetch(`${baseURL}/1`)
    .then((response) => response.json())
    .then((movie) => displayMovieDetails(movie))
    .catch((error) => console.error("Error fetching first movie:", error));
}

function loadAllMovies() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((movies) => {
      const filmList = document.getElementById("films");
      filmList.innerHTML = "";

      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = movie.title;
        li.dataset.id = movie.id;
        li.classList.add("film", "item");

        if (movie.capacity - movie.tickets_sold === 0) {
          li.classList.add("sold-out");
        }

        li.addEventListener("click", () => displayMovieDetails(movie));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();
          deleteMovie(movie.id, li);
        });

        li.appendChild(deleteButton);
        filmList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

function displayMovieDetails(movie) {
  console.log("Movie Data:", movie); // Debugging to check API data
  document.getElementById("poster").src = movie.poster;
  document.getElementById("title").textContent = movie.title;
  document.getElementById("runtime").textContent = `${movie.runtime} minutes`;
  document.getElementById("showtime").textContent = movie.showtime;

  const availableTickets = movie.capacity - movie.tickets_sold;
  console.log("Available Tickets:", availableTickets); // Debugging

  document.getElementById("ticket-count").textContent = availableTickets;

  const buyButton = document.getElementById("buy-ticket");
  buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
  buyButton.disabled = availableTickets === 0;
  buyButton.onclick = () => buyTicket(movie);
}

function buyTicket(movie) {
  const availableTickets = movie.capacity - movie.tickets_sold;

  if (availableTickets > 0) {
    movie.tickets_sold++;

    document.getElementById("ticket-count").textContent =
      movie.capacity - movie.tickets_sold;

    fetch(`${baseURL}/${movie.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickets_sold: movie.tickets_sold }),
    })
      .then((response) => response.json())
      .then((updatedMovie) => {
        if (updatedMovie.capacity - updatedMovie.tickets_sold === 0) {
          markAsSoldOut(updatedMovie.id);
        }
      })
      .catch((error) => console.error("Error updating tickets:", error));
  }
}

function markAsSoldOut(movieId) {
  const buyButton = document.getElementById("buy-ticket");
  buyButton.textContent = "Sold Out";
  buyButton.disabled = true;

  const filmListItems = document.querySelectorAll("#films li");
  filmListItems.forEach((li) => {
    if (li.dataset.id === String(movieId)) {
      li.classList.add("sold-out");
    }
  });
}

function deleteMovie(movieId, listItem) {
  fetch(`${baseURL}/${movieId}`, { method: "DELETE" })
    .then(() => {
      listItem.remove();
    })
    .catch((error) => console.error("Error deleting movie:", error));
}
