describe('My First Test', function() {
    it('Does not do much!', function() {
        expect(true).to.equal(true)
    })
})


describe('The Home Page', function() {
    it('successfully loads', function() {
        cy.visit('/')
    })
})

describe('The Home Page', function() {
    it('successfully loads', function() {
        cy.visit('/admin')
    })
})