/// <reference types="Cypress" />

describe('Page test', () => {
    it('successfully loads', () => {

        cy.login('admin');
        cy.wait(1500);
        cy.visit('http://localhost/mw1/?editmode=y')
        cy.wait(1500);
        cy.get('.mw-lslayout-tab', {timeout: 1000}).click({force:true});
        cy.wait(1500);
        cy.get('#mw-sidebar-modules-and-layouts-holder', {timeout: 3000}).find('li').first().as('firstLayout');
    cy.get('body').as('body')
        cy.wait(1500);
        cy.get('@firstLayout')
            .trigger('mousedown', { which: 1})

    
        cy.get('@body')
            .trigger('mousemove', { pageX: 200, pageY: 55, which: 1 })
            .trigger('mouseup');



        cy.get('body')
            .trigger('mousemove', { pageX: 5, pageY: 137 })
            .trigger('mousedown', { which: 1})
            .trigger('mousemove', { pageX: 5, pageY: 560 })
            .trigger('mouseup');



    })
})


