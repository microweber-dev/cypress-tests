/// <reference types="Cypress" />

describe('The Contact Page', function() {
	it('successfully loads', function() {
		
		cy.clearCookies()
		cy.visit('/contact')

		var Name = 'Bozhidar Slaveykov'
		var Email = 'bobi@microweber.com'
		var Message = 'This is my message.'

		cy.server()
		cy.route('POST', '**/api/post_form').as('postForm')

		cy.get('input[name=Name]').type(Name).should('have.value', Name)
		cy.get('input[name=Email]').type(Email).should('have.value', Email)
		cy.get('textarea[name=Message]').type(Message).should('have.value', Message)

		cy.get('.contact-form').find('.mw_form').submit() 
		
		var entryId = 0
		cy.wait('@postForm').then(function(xhr){
		  
		  entryId = xhr.response.body.id
		  
		  loginAdmin()
		  checkEntry(entryId, Name, Email, Message)
		  
		})

		function loginAdmin() {

			cy.clearCookies()
			cy.visit('/admin')


			const username = Cypress.env('username')
			const password = Cypress.env('password')


			cy.get('#lang_selector li').its('length').should('be.gt', 2)
			cy.get('#login_foot a').its('length').should('be.gt', 1)

			cy.get('input[name=username]').type(username)

			// {enter} causes the form to submit
			cy.get('input[name=password]').type(`${password}{enter}`)

			// we should be redirected to /dashboard
			cy.url().should('include', '/admin')

			cy.get('#mw-admin-main-menu li').its('length').should('be.gt', 3)

			cy.getCookie('laravel_session', {timeout: 3000}).should('exist')
		}
		
		function checkEntry(entryId, Name, Email, Message) {

			cy.get('a').contains('Notifications').click()
			
			cy.get('.all-notifications').find('.mw-ui-link').eq(0).click()
			
			cy.request('/api/get_contact_entry_by_id?id=' + entryId)
			  .then((response) => {
				
				expect(response.body).to.have.property('id', entryId)
				expect(response.body.custom_fields).to.have.property('Name', Name)
				expect(response.body.custom_fields).to.have.property('Email', Email)
				expect(response.body.custom_fields).to.have.property('Message', Message)
				
			  })
		}
	
	})
})

