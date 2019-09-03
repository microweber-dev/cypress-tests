/// <reference types="Cypress" />

describe('The Contact Page', function() {
	it('successfully loads', function() {
		
		cy.login('admin');
		cy.moduleContactFormDisableCaptcha();
		
		cy.visit('/contacts')

		var first_name = 'Bozhidar Slaveykov'
		var email = 'bobi@microweber.com'
		var message = 'This is my message.'
		var company_position = 'Company position'
		var phone = 'Phone'
		var company_name = 'Company name'
		var company_registration = 'Company registration'
	
		cy.get('input[name=first_name]').scrollIntoView() 

		cy.server()
		cy.route('POST', '**/api/post_form').as('postForm')

		cy.get('input[name=first_name]').type(first_name).should('have.value', first_name)
		cy.get('input[name=email]').eq(0).type(email).should('have.value', email)
		cy.get('textarea[name=message]').type(message).should('have.value', message)
		cy.get('input[name=company_position]').type(company_position).should('have.value', company_position)
		cy.get('input[name=company_name]').type(company_name).should('have.value', company_name)
		cy.get('input[name=company_registration]').type(company_registration).should('have.value', company_registration)
		cy.get('input[name=phone]').type(phone).should('have.value', phone)

		cy.get('input[name=first_name]').parent().parent().parent().find('form').submit() 
		
		var entry_id = 0
		cy.wait('@postForm').then(function(xhr){
		  
		  entry_id = xhr.response.body.id
		  
		  cy.login('admin');
		  checkEntry(entry_id, first_name, email, message)
		  
		})
		
		function checkEntry(entry_id, first_name, email, message) {

			cy.get('a').contains('Notifications').click()
			
			cy.get('.all-notifications').find('.mw-ui-link').eq(0).click()
			
			cy.request('/api/get_contact_entry_by_id?id=' + entry_id)
			  .then((response) => {
				
				expect(response.body).to.have.property('id', entry_id)
				expect(response.body.custom_fields).to.have.property('first_name', first_name)
				expect(response.body.custom_fields).to.have.property('email', email)
				expect(response.body.custom_fields).to.have.property('message', message)
				
				expect(response.body.custom_fields).to.have.property('phone', phone)
				expect(response.body.custom_fields).to.have.property('company_position', company_position)
				expect(response.body.custom_fields).to.have.property('company_name', company_name)
				expect(response.body.custom_fields).to.have.property('company_registration', company_registration)
				
				
			  })
		}
	
	})
})


