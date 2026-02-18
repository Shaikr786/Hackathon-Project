// cypress/pages/UsedCarsPage.js
class UsedCarsPage {

  openUsedCars() {
    cy.get('span:contains("MORE")').invoke('show');
    cy.contains('Used Cars').click({ force: true });
  }

  selectCity(city) {
    cy.get('.zw-sr-popPadding').find('.searchFilter').contains(city).click();
  }

  getPopularModels() {
    return cy.get('.zw-sr-secLev.usedCarMakeModelList.popularModels.ml-20.mt-10')
             .find('input[type="checkbox"]');
  }

  getCarCards() {
    return cy.get('.zw-sr-searchTarget.col-lg-4');
  }

  cleanPrice(priceText) {
    const cleanText = priceText.replace('Rs.', '').replace('Lakh', '').trim();
    const numericValue = parseFloat(cleanText);
    return numericValue * 100000;
  }
}

export default UsedCarsPage;
