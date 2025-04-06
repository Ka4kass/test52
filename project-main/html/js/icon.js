 // Navigation Toggle
 document.querySelector('.').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Region and City Selection Logic
const regionSelect = document.getElementById('region-select');
const citySelect = document.getElementById('city-select');

// Define cities for each region
const regionCities = {
    'bayern': ['München', 'Nürnberg', 'Augsburg', 'Regensburg', 'Würzburg'],
    'nrw': ['Köln', 'Düsseldorf', 'Dortmund', 'Essen', 'Bonn', 'Münster'],
    'berlin-brandenburg': ['Berlin', 'Potsdam', 'Frankfurt (Oder)', 'Cottbus'],
    'hamburg': ['Hamburg', 'Lübeck', 'Kiel', 'Flensburg'],
    'sachsen': ['Dresden', 'Leipzig', 'Chemnitz', 'Görlitz']
};

// Update cities when region changes
regionSelect.addEventListener('change', function() {
    const selectedRegion = this.value;
    
    // Reset and disable city select if no region selected
    if (!selectedRegion) {
        citySelect.innerHTML = '<option value="">Stadt auswählen</option>';
        citySelect.disabled = true;
        return;
    }
    
    // Enable city select and populate with cities for the selected region
    citySelect.disabled = false;
    citySelect.innerHTML = '<option value="">Stadt auswählen</option>';
    
    // Add cities for the selected region
    regionCities[selectedRegion].forEach(city => {
        const option = document.createElement('option');
        option.value = city.toLowerCase().replace(' ', '-');
        option.textContent = city;
        citySelect.appendChild(option);
    });
    
    // Update displayed cities (for the regions page)
    updateCitiesDisplay(selectedRegion);
});

// Function to update the cities display based on selected region
function updateCitiesDisplay(region) {
    const citiesGrid = document.querySelector('.cities-grid');
    
    // Clear current cities
    citiesGrid.innerHTML = '';
    
    // If no region selected, don't display any cities
    if (!region) return;
    
    // Add cities for the selected region
    regionCities[region].forEach(city => {
        const cityCard = document.createElement('div');
        cityCard.className = 'city-card';
        cityCard.innerHTML = `
            <img src="/api/placeholder/400/500" alt="${city}">
            <div class="city-card-content">
                <h3>${city}</h3>
                <p>${getRandomModelCount()} Modelle verfügbar</p>
            </div>
        `;
        citiesGrid.appendChild(cityCard);
    });
}

// Helper function to get random model count
function getRandomModelCount() {
    return Math.floor(Math.random() * 10) + 1;
}


// Page Navigation (for demo purposes)
const pages = {
    'home': document.getElementById('home-page'),
    'regions': document.getElementById('regions-page'),}