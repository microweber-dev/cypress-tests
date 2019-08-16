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
  
  
  
		cy.visit('/admin/view:modules')
		 
		 
		
		cy.visit('/admin/view:modules/load_module:users#sortby=created_at%20desc')
		
		cy.wait(1500).get('#mw-users-manage-edit-rotattor',{timeout:3000}).toMatchImageSnapshot({});
   
	    cy.wait(1500).get('#add-new-user-btn',{timeout:3000}).click();
		cy.wait(1500).get('#user-section-title',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).get('#user_edit_admin_panel',{timeout:3000}).toMatchImageSnapshot({});
		cy.wait(1500).get('#user_edit_admin_panel').find('input[name=username]').type(`aaaaFHTaa`)
        cy.wait(1500).get('#user_edit_admin_panel').contains('Change Password').click();
		cy.wait(1500).get('#user_edit_admin_panel').find('input[name=password]').type(`aaaaFHTaa`)
		cy.wait(1500).get('#user_edit_admin_panel').find('input[name=email]').type(`johnDoe@john.doe`)
		cy.wait(1500).get('#user_edit_admin_panel').find('input[name=first_name]').type(`userrrr`)
		cy.wait(1500).get('#user_edit_admin_panel').find('input[name=last_name]').type(`userrrr`)
	    cy.wait(1500).get('#user_edit_admin_panel').find('input[name=is_admin]').first().click({force:true});
		cy.wait(1500).get('#user_edit_admin_panel').contains('Save').click();
		cy.wait(1500).get('#users_admin_panel',{timeout:3000}).toMatchImageSnapshot({});
	 })
})