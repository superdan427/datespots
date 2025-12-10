// ------------------------------------
// IMPORT DATA
// ------------------------------------

import { dateSpots } from "./data/dateSpots.js";


// ------------------------------------
// IMPORT UI MODULES
// ------------------------------------

import { renderList, renderFilters } from "./ui/list.js";
import { openModal, setupModalClose } from "./ui/modal.js";


// ------------------------------------
// IMPORT MAP MODULES
// ------------------------------------

import {
  createMap,
  addMarkers,
  removeMarkers,
  flyToSpot
} from "./map/map.js";


// ------------------------------------
// IMPORT P5 VISUAL LAYER
// ------------------------------------

import { updateVisuals } from "./visual/p5Sketch.js";


// ------------------------------------
// INITIALISE CORE SYSTEMS
// ------------------------------------

// Create Mapbox map
const map = createMap("map");

// Enable modal close behaviour
setupModalClose();


// ------------------------------------
// DERIVED DATA
// ------------------------------------

// Extract unique categories for filters
const categories = ["all", ...new Set(dateSpots.map((s) => s.category))];

// Keep reference to current map markers
let currentMarkers = [];


// ------------------------------------
// MAIN UI UPDATE PIPELINE
// ------------------------------------

function updateUI(spots) {
  // Render list and handle list item clicks
  renderList("list-items", spots, (spot) => {
    flyToSpot(map, spot);
    openModal(spot);
  });

  // Remove existing markers
  removeMarkers(currentMarkers);

  // Add markers and handle marker clicks
  currentMarkers = addMarkers(map, spots, (spot) => {
    flyToSpot(map, spot);
    openModal(spot);
  });

  // Update p5 visuals
  updateVisuals(spots);
}


// ------------------------------------
// FILTER CONTROLS
// ------------------------------------

renderFilters("filters", categories, (category) => {
  const filteredSpots =
    category === "all"
      ? dateSpots
      : dateSpots.filter((spot) => spot.category === category);

  updateUI(filteredSpots);
});


// ------------------------------------
// INITIAL LOAD
// ------------------------------------

// Render everything on first load
updateUI(dateSpots);
