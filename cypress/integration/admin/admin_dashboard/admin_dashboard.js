describe('The Admin Page', function () {
    it('successfully loads', function () {
        cy.clearCookies()
        cy.visit('/admin')
    })


    it('sets auth cookie when logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object


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

    })


    it('test admin dashboard', function () {

        cy.get('#site-stats-admin-site-stats-dashboard-graph').should('exist')
        cy.get('#admin-dashboard-recent-comments').should('exist')
        cy.get('#create-content-menu').should('exist')
        cy.get('.admin-side-content').should('exist')



    })

    it('test admin snapshot 1', function () {
        cy.wait(1500).get('#main-bar', {timeout: 3000}).toMatchImageSnapshot();
    })

    it('test admin snapshot 2', function () {
        cy.wait(1500).get('#main-bar-mw-icon', {timeout: 3000}).toMatchImageSnapshot();
    })
    it('test admin snapshot 3', function () {
        cy.wait(1500).get('.admin-toolbar', {timeout: 3000}).toMatchImageSnapshot({

        });
    })


    it('test admin snapshot 4', function () {
        cy.wait(1500).get('#order-n-4', {timeout: 3000}).toMatchImageSnapshot({});

    })

})
 
  
