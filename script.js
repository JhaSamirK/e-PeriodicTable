document.addEventListener('DOMContentLoaded', () => {
    const elementInput = document.getElementById('elementInput');
    const searchButton = document.getElementById('searchButton');
    const elementDetails = document.getElementById('elementDetails');
  
    // Function to handle the search action
    function performSearch() {
      const elementSymbol = elementInput.value;
      if (elementSymbol) {
        fetch('data.json')
          .then((response) => {
            return response.json()
          }).then((data) => {
            const element = data.elements.find(elem => {
              return elem.symbol === elementSymbol;
            });
            if (element) {
              // Display element details in the #elementDetails div
              elementDetails.innerHTML = `
                              <h2>${element.name} (${element.symbol})</h2>
                              <img src="${element.image.url}" alt="${element.name} Image" style="max-width: 25%;" />
                              <p>Atomic Number : ${element.number}</p>
                              <p>Atomic Mass : ${element.atomic_mass} amu</p>
                              <p>Category : ${element.category}</p>
                              <p>Natural Phase : ${element.phase}</p>
                              <p>Discovered By : ${element.discovered_by}
                              <p>Density : ${element.density} kg/m^3</p>
                              <p>Block : ${element.block}</p>
                              <p>Period : ${element.period}</p>
                              <p>Group : ${element.group}</p>
                              <p>Electronic Configuration : ${element.electron_configuration}</p>
  
                              <!-- Add more details as needed -->
                          `;
              elementDetails.classList.remove('hidden');
            } else {
              elementDetails.innerHTML = 'Element not found.';
              elementDetails.classList.remove('hidden');
            }
          })
          .catch(error => {
            console.error('Error fetching element details:', error);
            elementDetails.innerHTML = 'Element not found.';
            elementDetails.classList.remove('hidden');
          });
      }
    }
  
    //Event listener for the "Search" button click
    searchButton.addEventListener('click', performSearch);
  
    // Event listener for Enter key press in the input field
    elementInput.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  });
  