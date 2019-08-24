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


    it('create a post 1', function () {



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
        cy.visit('admin/view:content/action:posts')

        cy.wait(1500).get('#pages_edit_container').contains('Add new post').click()

        cy.wait(1500).get(' #content-title-field').type(`injektiplqktor`)
        cy.wait(1500).get('.mw-iframe-editor').first()
            .iframe().click()
            .find('.element').first()
            .type("injektiplqktor na kabadabarcheta i shamandoileiki YUFGUYFYT&UTGHjkRFTFRUYJB FYTYJUHJYEYFH")


        cy.wait(1500).get('#content-title-field-buttons').contains('Save').click()
        cy.wait(1500).get('#mw-admin-main-menu', {timeout: 3000}).toMatchImageSnapshot({});
        cy.visit('admin/view:content');
        cy.visit('admin/view:content/action:posts');
    })


})