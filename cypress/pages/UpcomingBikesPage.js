class UpcomingBikesPage {

    hoveNewBikes() {
        cy.get('span:contains("NEW BIKES")').trigger('mouseover')
    }

    clickUpcomingBikes() {
        cy.contains('Upcoming Bikes').click({ force: true })
    }

    selectBrand(brandName) {
        cy.get('div[class="ns-icR pl-15 fnt-m"]').contains(brandName).click()
    }

    getBikeCards() { 
        return cy.get('div.p-15.pt-10.mke-ryt.rel').should('exist'); 
    }

    cleanPrice(priceText) {
        const cleanText = priceText.replace('Rs.', '').replace('Lakh', '').trim();
        return parseFloat(cleanText) * 100000;
    }
}

export default UpcomingBikesPage;


