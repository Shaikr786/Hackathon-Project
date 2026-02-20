// cypress/pages/UsedCarsPage.js
class UsedCarsPage {

  // Opens the "Used Cars" section from the homepage
  openUsedCars() {
    // Show the hidden "MORE" menu item
    cy.get('span:contains("MORE")').invoke('show');
    // Click on "Used Cars" link (force:true ensures click works even if hidden)
    cy.contains('Used Cars').click({ force: true });
  }

  // Selects a city from the filter list
  selectCity(city) {
    // Find the city filter container and click on the city name provided
    cy.get('.zw-sr-popPadding')
      .find('.searchFilter')
      .contains(city)
      .click();
  }

  // Gets all popular car model checkboxes
  getPopularModels() {
    // Locate the section that lists popular models and return all checkbox inputs
    return cy.get('.zw-sr-secLev.usedCarMakeModelList.popularModels.ml-20.mt-10')
             .find('input[type="checkbox"]');
  }

  // Gets all car cards displayed on the search results page
  getCarCards() {
    // Each car card is inside a div with this class
    return cy.get('.zw-sr-searchTarget.col-lg-4');
  }

  // Cleans up the price text and converts it into a numeric value (in rupees)
  cleanPrice(priceText) {
    // Remove "Rs." and "Lakh" from the text, then trim spaces
    const cleanText = priceText.replace('Rs.', '').replace('Lakh', '').trim();
    // Convert the cleaned string into a number
    const numericValue = parseFloat(cleanText);
    // Multiply by 100000 because "1 Lakh" = 100,000 rupees
    return numericValue * 100000;
  }
}

export default UsedCarsPage;
