describe('Admin edit settings', function () {


    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: ["back_to_admin", "laravel_session"]
        });

        cy.mwBeforeEach();



    })


    it('Editing website settings ', function () {


        const faker = require('faker');
        var randomText1 = faker.name.findName() + ' - '  + faker.datatype.number(); // Harry Potter
        var randomText2 = faker.animal.cat() + ' - '  + faker.datatype.number(); // Harry Potter
        var randomText3 = faker.animal.horse() + ' - '  + faker.datatype.number(); // Harry Potter


        cy.mwLoginToAdminPanelNotLogged();
        cy.visit('/admin/view:content/action:settings')
        cy.get('.select-settings', {timeout: 15000}).should('exist')

        cy.waitUntil(() => cy.get('a.js-website-settings-link').first().click());
        cy.wait(1000);;

        cy.waitUntil(() => cy.get('.module-settings-group-website').find('input[name=website_title]').clear().type(randomText1).type('{enter}'));
        cy.waitUntil(() => cy.get('.module-settings-group-website').find('textarea[name=website_description]').clear().type(randomText2).blur());
        cy.waitUntil(() => cy.get('.module-settings-group-website').find('input[name=website_keywords]').clear().type(randomText3).type('{enter}'));


        cy.wait(3000);;



        cy.visit('/admin/view:content')
        cy.wait(1000);;
        cy.visit('/admin/view:content/action:settings')
        cy.waitUntil(() => cy.get('a.js-website-settings-link').first().click());
        cy.wait(1000);;


        cy.waitUntil(() => cy.get('.module-settings-group-website').find('input[name=website_title]').invoke("val").should("eq", randomText1));
        cy.waitUntil(() => cy.get('.module-settings-group-website').find('textarea[name=website_description]').invoke("val").should("eq", randomText2));
        cy.waitUntil(() => cy.get('.module-settings-group-website').find('input[name=website_keywords]').invoke("val").should("eq", randomText3));

    })


})
