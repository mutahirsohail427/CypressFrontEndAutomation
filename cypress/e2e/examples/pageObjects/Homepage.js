class HomePage {

    getSearch(){
        return cy.get('.search-keyword')
    }

    getProductList(){
        return cy.get('.products')
    }

    getCart(){
        return cy.get('.cart-icon > img')
    }

}

export default HomePage