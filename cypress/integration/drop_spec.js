/// <reference types="Cypress" />

describe('Page test', function() {
	it('successfully loads', function() {
		
		cy.login('admin');
		cy.wait(1500);
		cy.visit('http://127.0.0.6/microweber/home?editmode=y')
		//cy.get('#mw-modules-layouts-tabsnav').find('a').first().click({force:true})


	
	})
})


