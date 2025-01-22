const NASA_API_KEY = "VbALecFf17M2eb7OwpYq4wCJdDzi2hruMCgzVTfR"; // Replace with your NASA API key

// Fetch Astronomy Picture of the Day (APOD)
async function fetchAPOD() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  
  document.getElementById("apod-image").src = data.url;
  document.getElementById("apod-title").textContent = data.title;
  document.getElementById("apod-description").textContent = data.explanation;
}

// Fetch Mars Rover Photos
async function fetchMarsPhotos() {
  const date = document.getElementById("mars-date").value;
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  const gallery = document.getElementById("mars-gallery");
  gallery.innerHTML = ""; // Clear existing photos
  data.photos.slice(0, 10).forEach(photo => {
    const img = document.createElement("img");
    img.src = photo.img_src;
    gallery.appendChild(img);
  });
}

// Fetch Planet Data (Static JSON)
async function fetchPlanets() {
  const url = "https://api.le-systeme-solaire.net/rest/bodies/";
  const response = await fetch(url);
  const data = await response.json();

  const planets = data.bodies.filter(body => body.isPlanet);
  const planetList = document.getElementById("planet-list");
  
  planets.forEach(planet => {
    const div = document.createElement("div");
    div.className = "planet";
    div.innerHTML = `
      <h3>${planet.englishName}</h3>
      <p>Mass: ${planet.mass?.massValue || "N/A"} × 10<sup>${planet.mass?.massExponent || 0}</sup> kg</p>
      <p>Gravity: ${planet.gravity || "N/A"} m/s²</p>
    `;
    planetList.appendChild(div);
  });
}

// Initialize the app
document.getElementById("fetch-mars-photos").addEventListener("click", fetchMarsPhotos);
fetchAPOD();
fetchPlanets();
