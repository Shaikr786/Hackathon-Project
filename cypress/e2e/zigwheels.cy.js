import ContactUsPage from "../pages/ContactUsPage";
import UpcomingBikesPage from "../pages/UpcomingBikesPage";
import UsedCarsPage from "../pages/UsedCarsPage";

describe('suit', () => {

  const bikes = new UpcomingBikesPage();
  const cars = new UsedCarsPage();
  const contact = new ContactUsPage();

  beforeEach(function () {

    cy.visit('/')

    cy.fixture('ZigWheels').then((data) => {
      this.data = data;
    });
  });

  it('Display upcoming bike details',{ tags: '@bikes' }, function() {

    bikes.hoveNewBikes()

    bikes.clickUpcomingBikes()

    bikes.selectBrand(this.data.brandName)

    bikes.getBikeCards().each(($div, index) => {

      const title = $div.find('strong').text().trim();
      const priceText = $div.find('.b.fnt-15').text().trim();
      const Expectdate = $div.find('.clr-try.fnt-14').text().trim();

      const checkPrice= bikes.cleanPrice(priceText);

      if (checkPrice < 400000) {
        cy.log(` ${index + 1} UNDER BUDGET: ${title} - ${priceText} - ${Expectdate}`);
      }
    });
  });

   it('List all popular Car models available in Chennai',{ tags: '@cars' }, function() {
      
      cars.openUsedCars(); 

      cars.selectCity(this.data.city);
 
      cars.getCarCards().each((_, index) => { 

        cars.getCarCards().eq(index).find('.pl-30.zw-sr-paddingLeft').then(($el) => {

            const title = $el.find('.fnt-22.zm-cmn-colorBlack.n.zw-sr-headingPadding.clickGtm.saveslotno').text().trim(); 
            const price = $el.find('.zw-cmn-price.n.pull-left.mt-3').text().trim(); 
            cy.log(`CAR NAME: ${title} - ${price}`); 

        }); 
    }); 
  });

  it("give invalid details & capture the error message",{ tags: '@capture' }, function () {

    contact.openContactUsForm(); 

    cy.form(
      this.data.formData.message,
      this.data.formData.firstName, 
      this.data.formData.lastName, 
      this.data.formData.email, 
      this.data.formData.mobile
    );

    contact.captureError().then(text => 
      { 
        cy.log("Error Text: " + text); 
        expect(text).to.contain('Invalid')
      });
    
  })

});