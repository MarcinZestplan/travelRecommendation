 const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navSearch = document.getElementById('nav-search');
 
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    navSearch.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  let travelData = null;

  // Load JSON on page start
  fetch('travel_recommendation_api.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load: ' + response.status);
      return response.json();
    })
    .then(data => {
      travelData = data;
      console.log('✅ JSON loaded successfully:', travelData);
    })
    .catch(error => console.error('❌ Error loading JSON:', error));
  
  
  // Search button
  document.getElementById('btn-search').addEventListener('click', handleSearch);
  
  // Reset button
  document.getElementById('btn-reset').addEventListener('click', clearSearch);
  
  // Enter key
  document.getElementById('search-field').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });
  
function handleSearch() {
  const query = document.getElementById('search-field').value.trim().toLowerCase();
  if (!query) return;
  if (!travelData) { console.warn('Data not loaded yet'); return; }

  let results = [];

  if (query.includes('beach')) {
    results = travelData.beaches;

  } else if (query.includes('temple')) {
    results = travelData.temples;

  } else if (query.includes('country')) {
    // Show all cities from all countries
    travelData.countries.forEach(country => {
      results = results.concat(country.cities);
    });

  } else {
    // Search by specific country name or city name
    travelData.countries.forEach(country => {
      if (country.name.toLowerCase().includes(query)) {
        results = results.concat(country.cities);
      } else {
        country.cities.forEach(city => {
          if (city.name.toLowerCase().includes(query)) results.push(city);
        });
      }
    });
  }

  console.log(`🔍 Search: "${query}" → ${results.length} result(s)`, results);

  document.querySelector('.hero__content').style.display = 'none';
  displayResults(results, query);
}
  
  
  function clearSearch() {
    document.getElementById('search-field').value = '';
    document.getElementById('results-container').innerHTML = '';
  
    // Restore hero content
    document.querySelector('.hero__content').style.display = 'block';
    console.log('🔄 Search cleared');
  }
  



  function displayResults(results, query) {
    const container = document.getElementById('results-container');
  
    if (results.length === 0) {
      container.innerHTML = `
        <h2 class="results-title">Search Results</h2>
        <p class="results-empty">No results found for "<strong>${query}</strong>". Try beach, temple, or a country name.</p>
      `;
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  
    const cards = results.map(place => `
      <div class="result-card">
        <img src="${place.imageUrl}" alt="${place.name}" />
        <div class="result-card__body">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
        </div>
      </div>
    `).join('');
  
    container.innerHTML = `
      <h2 class="results-title">Search Results</h2>
      <div class="results-grid">${cards}</div>
    `;
  
    // Scroll results into view, replacing the hero text visually
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  
