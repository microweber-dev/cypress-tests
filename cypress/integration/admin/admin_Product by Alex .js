import {fixCypressSpec} from '../../support'

beforeEach(fixCypressSpec(__filename))

describe('The Admin POST', function () {


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
        //end of login
    })


    it('create a product 1', function () {



        //login
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
        //end of login

        cy.wait(1500).get('#mw-admin-main-menu', {timeout: 3000}).toMatchImageSnapshot({});

        cy.visit('admin/view:content')
        cy.visit('admin/view:content/action:products')

        cy.wait(1500).get('#pages_edit_container').contains('                                    Add new product                                ').click()

        cy.wait(1500).get(' #content-title-field').type(`produk48916328746`)
        cy.wait(1500).get('.mw-iframe-editor').first()
            .iframe().click()
            .find('.element').first()
            .type("agdsudsahdtfsahdfasdfashdaagdsudsahdtfsahdfasdfashdaagdsudsahdtfsahdfasdfashdaagdsudsahdtfsahdfasdfashdaagdsudsahdtfsahdfasdfashdaagdsudsahdtfsahdfasdfashda")


        cy.wait(1500).get('#product-price-field-label').next().type('69')

        cy.wait(1500).get('#content-title-field-buttons').contains('Save').click()


        cy.wait(1500).get('#mw-admin-main-menu', {timeout: 3000}).toMatchImageSnapshot({});
        cy.visit('admin/view:content')
        cy.visit('admin/view:content/action:products')


        cy.wait(1500).get('#mw_admin_posts_sortable').contains('Save').click()

    })


})