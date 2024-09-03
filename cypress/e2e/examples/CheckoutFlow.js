/// <reference types="Cypress" />
import HomePage from "./pageObjects/Homepage"
 
describe('Checkout Functionality', function() 
{
    before(function() {
        cy.fixture('example').then(function(data){
            this.data = data
        })
    })
 
    it('Product Checkout',function() {
        const homeLoc = new HomePage()
        console.log(this.data.name)
        cy.log(this.data.name)
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        homeLoc.getSearch().type('C')
        cy.wait(2000)
        homeLoc.getProductList().as('productLocator')
        this.data.products.forEach(element => {
            cy.productSelection(element)
        });
        homeLoc.getCart().click()
        cy.contains(this.data.checkout).click()
        var sum = 0
        cy.get('tr td:nth-child(4)').each(($el, index, $list) => {
            if (index > 0){
                var amount = Number($el.text())
                cy.log(amount)
                sum = Number(sum) + amount
            }
        }).then(function(){
            cy.get('.totAmt').then(function(totalAm){
                var totalAmount = totalAm.text()
                cy.log(totalAmount)
                cy.log(sum)
                expect(sum).to.equal(Number(totalAmount))
            })
        })
        cy.contains('Place Order').click()
        cy.get('select').select('Pakistan')
        cy.get('.chkAgree').check()
        cy.get('button').click()
        cy.get('[style="color:green;font-size:25px"]').should('have.text', this.data.confirmation)
    })
 
})