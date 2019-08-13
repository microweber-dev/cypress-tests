import { fixCypressSpec } from '../../support'

beforeEach(fixCypressSpec(__filename))
    
describe('The Admin Page 2', function() {

	
	
    it('successfully loads', function() {
       

        cy.visit('/admin')
		
		
		
        const username = Cypress.env('username')
        const  password  = Cypress.env('password')


        cy.get('#lang_selector li').its('length').should('be.gt', 2)
        cy.get('#login_foot a').its('length').should('be.gt', 1)

        cy.get('input[name=username]').type(username)

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}{enter}`)

        // we should be redirected to /dashboard
        cy.url().should('include', '/admin')

        cy.get('#mw-admin-main-menu li').its('length').should('be.gt', 3)


        // our auth cookie should be present
        cy.getCookie('laravel_session',{timeout:3000}).should('exist')
		
		
		
     


		cy.wait(1500);
  
  
  
		cy.visit('/admin/view:shop')
		 
		 
        cy.wait(1500).get('#mw-admin-main-menu .active',{timeout:3000}).toMatchImageSnapshot({});
		
		 
		
		
		
		
   
		cy.visit('/admin/view:shop/action:products')
		 
		 
        cy.wait(1500).get('.admin-manage-toolbar-holder',{timeout:3000}).toMatchImageSnapshot({});
     
		cy.visit('/admin/view:shop/action:options')
		 
 		
		
		
		cy.wait(1500).contains('Payment methods').click()    
		cy.wait(1500).get('#mw-main-module-backend-shop-settings-shop-payments',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).contains('Payment methods').click()    

		cy.wait(1500).contains('General Shop Settings').click()    
		cy.wait(1500).get('#general-shop-settings-accordion',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).contains('General Shop Settings').click()    
		
		
		
		cy.wait(1500).contains('Taxes').click()    
		cy.wait(1500).get('#taxes-accordion',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).contains('Taxes').click()    
		         
		
		cy.wait(1500).contains('Promotions').click()    
		cy.wait(1500).get('#tabsnav',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).contains('Promotions').click()    
		       
	    cy.wait(1500).contains('Send email to the client on new order').click()    
		cy.wait(1500).get('#mw-main-module-backend-shop-settings-shop-orders-settings-setup-emails-on-order-admin-mail-providers-integration-select',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).contains('Send email to the client on new order').click()    
     
	    
        cy.wait(1500).contains('Other shop settings').click()		
		cy.wait(1500).get('#mw_shop_set_other_settings').contains('Shop settings').click()
		cy.wait(1500).get('#shop-settings-accordion',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).contains('Other shop settings').click()  

		cy.wait(1500).contains('Other shop settings').click()		
		cy.wait(1500).get('#mw_shop_set_other_settings').contains('Shipping units').click()
		cy.wait(1500).get('#shipping-units-setup-accordion',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).contains('Other shop settings').click()  
	 })
})