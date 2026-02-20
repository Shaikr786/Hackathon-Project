// cypress/pages/UpcomingBikesPage.js
class UpcomingBikesPage {

    // Hover over the "NEW BIKES" menu item
    hoveNewBikes() {
        // Trigger a mouseover event on the "NEW BIKES" span
        cy.get('span:contains("NEW BIKES")').trigger('mouseover')
    }

    // Click on the "Upcoming Bikes" option
    clickUpcomingBikes() {
        // Force click ensures it works even if element is hidden or overlapped
        cy.contains('Upcoming Bikes').click({ force: true })
    }

    // Select a bike brand by its name
    selectBrand(brandName) {
        // Find the brand list container and click on the brand name provided
        cy.get('div[class="ns-icR pl-15 fnt-m"]').contains(brandName).click()
    }

    // Get all bike cards displayed on the page
    getBikeCards() { 
        // Each bike card is inside a div with these classes
        // .should('exist') ensures the cards are present before continuing
        return cy.get('div.p-15.pt-10.mke-ryt.rel').should('exist'); 
    }

    // Clean up the price text and convert it into a numeric value (in rupees)
    cleanPrice(priceText) {
        // Remove "Rs." and "Lakh" from the text, then trim spaces
        const cleanText = priceText.replace('Rs.', '').replace('Lakh', '').trim();
        // Convert the cleaned string into a number
        // Multiply by 100000 because "1 Lakh" = 100,000 rupees
        return parseFloat(cleanText) * 100000;
    }
}

export default UpcomingBikesPage;
