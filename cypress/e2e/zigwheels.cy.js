// Import page objects (these are custom classes that contain reusable functions for each page)
import ContactUsPage from "../pages/ContactUsPage";
import UpcomingBikesPage from "../pages/UpcomingBikesPage";
import UsedCarsPage from "../pages/UsedCarsPage";

// Group all tests inside a "describe" block
describe('suit', () => {

  // Create objects for each page so we can use their methods
  const bikes = new UpcomingBikesPage();
  const cars = new UsedCarsPage();
  const contact = new ContactUsPage();

  // This runs before each test
  beforeEach(function () {
    // Open the base URL of the site
    cy.visit('/')

    // Load test data from fixture file (ZigWheels.json)
    cy.fixture('ZigWheels').then((data) => {
      this.data = data; // Store data so we can use it in tests
    });
  });

  // Test case 1: Display upcoming bike details
  it('Display upcoming bike details',{ tags: '@bikes' }, function() {

    // Hover over "New Bikes" menu
    bikes.hoveNewBikes()

    // Click on "Upcoming Bikes"
    bikes.clickUpcomingBikes()

    // Select a bike brand from fixture data
    bikes.selectBrand(this.data.brandName)

    // Loop through each bike card displayed on the page
    bikes.getBikeCards().each(($div, index) => {

      // Extract bike details: title, price, expected launch date
      const title = $div.find('strong').text().trim();
      const priceText = $div.find('.b.fnt-15').text().trim();
      const Expectdate = $div.find('.clr-try.fnt-14').text().trim();

      // Clean price text to get numeric value
      const checkPrice= bikes.cleanPrice(priceText);

      // If price is under 4 lakhs, log the details
      if (checkPrice < 400000) {
        cy.log(` ${index + 1} UNDER BUDGET: ${title} - ${priceText} - ${Expectdate}`);
      }
    });
  });

  // Test case 2: List all popular car models available in Chennai
  it.only('List all popular Car models available in Chennai',{ tags: '@cars' }, function() {
      
      // Open "Used Cars" page
      cars.openUsedCars(); 

      // Select city from fixture data
      cars.selectCity(this.data.city);

       // // Loop through each car card and log the title and price
      cars.getCarCards().each(($card, index) => {

        const title = $card.find('.fnt-22.zm-cmn-colorBlack.n.zw-sr-headingPadding.clickGtm.saveslotno').text().trim();
        const price = $card.find('.zw-cmn-price.n.pull-left.mt-3').text().trim();

        cy.log(`CAR ${index + 1}: ${title} - ${price}`);
      });
  });

  // // Test case 3: Give invalid details & capture the error message
  it("give invalid details & capture the error message",{ tags: '@capture' }, function () {

  // Loop through each set of form data
  this.data.formData.forEach((formSet, index) => {

    // Open "Contact Us" form
    contact.openContactUsForm(); 

    // Fill form with current dataset
    cy.form(
      formSet.message,
      formSet.firstName, 
      formSet.lastName, 
      formSet.email, 
      formSet.mobile
    );

    // Capture error message and check if it contains "Invalid"
    contact.captureError().then(text => { 

      cy.log(`Dataset ${index + 1} - Error Text: ${text}`); 

      // Assert error message
      // expect(text).to.contain('Invalid');

      // Take screenshot for each dataset
      contact.getErrorContainer().screenshot(`error_message_${index + 1}`); 
    });
  });
});


});
