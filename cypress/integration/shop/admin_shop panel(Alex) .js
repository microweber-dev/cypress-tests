import {fixCypressSpec} from '../../support'

beforeEach(fixCypressSpec(__filename))

describe('The Admin Page 2', function () {


    it('successfully loads', function () {


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


        // our auth cookie should be present
        cy.getCookie('laravel_session', {timeout: 3000}).should('exist')


        cy.wait(1500);


        cy.visit('/admin/view:shop/action:orders')


        cy.wait(1500).get('#mw-admin-manage-orders-list').find('.orders-holder').find('.product-image').first().click().toMatchImageSnapshot({})
        cy.wait(1500).get('#shop-orders').find('.order-data-more').first().click().find('.view-order-button').first().click().toMatchImageSnapshot({})
        cy.wait(1500).get('.order-status-selector').find('.mw-ui-check').find('input[value=completed]').first().click({force: true}).toMatchImageSnapshot({});


    })
})