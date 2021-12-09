describe('Browsing Pages In Live Edit', function () {


    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: ["back_to_admin", "laravel_session"]
        });

        cy.mwBeforeEach();



    })


    it('Adding pages ', function () {


        const faker = require('faker');
        var randomName = faker.name.findName() + ' - '  + faker.datatype.number(); // Harry Potter


        cy.mwLoginToAdminPanelNotLogged();

        cy.visit('/admin/view:content')
        cy.get('#pages_edit_container', {timeout: 15000}).should('exist')
        cy.wait(5000);;

        cy.waitUntil(() => cy.get('#pages_edit_container').find('a.btn-outline-success').first().click());

        cy.frameLoaded('.preview_frame_small')
        cy.wait(3000);;




        cy.waitUntil(() => cy.get('input[name=title]').type(randomName));
        cy.waitUntil(() => cy.scrollTo('top'));

        cy.waitUntil(() => cy.get('.module-menu').find('.custom-checkbox').first().click());
        cy.waitUntil(() => cy.get('#is_active_0').parent().first().click());
        cy.waitUntil(() => cy.get('#content-title-field-buttons').find('#js-admin-save-content-main-btn').click());

        cy.wait(3000);;

   //     cy.reload()
        cy.waitUntil(() => cy.get('input[name=title]').should('have.value', randomName));


        cy.visit('/admin/view:content')


        cy.waitUntil(() => cy.get('.js-search-by-keywords').get('input.js-search-by-keywords-input').type(randomName));
        cy.waitUntil(() => cy.get('.js-search-by-keywords').get('input.js-search-by-keywords-input').type('{enter}'));

        cy.waitUntil(() => cy.get('.item-title').get('input.js-search-by-keywords-input').type('{enter}'));

        cy.wait(3000);
        cy.waitUntil(() => cy.get('.manage-post-main').get('.manage-item-main-top').should('exist'));

        cy.waitUntil(() => cy.get('.manage-post-item-title').invoke("text").should("eq", randomName));

        cy.waitUntil(() => cy.get('.manage-post-item-title').contains(randomName ).parents('.card-body').first().find('.btn-outline-success').first().click());
        cy.wait(5000);


        cy.frameLoaded('.preview_frame_small')
        cy.wait(1000);
        cy.waitUntil(() => cy.get('input[name=title]').should('have.value', randomName));

        cy.waitUntil(() => cy.get('#is_active_0').should('be.checked'));
        cy.waitUntil(() => cy.get('select[name="parent_id_selector"]').should('exist'));


        cy.waitUntil(() => cy.get('a[data-target="#seo-settings"]').click());
        cy.waitUntil(() => cy.get('a[data-target="#advanced-settings"]').click());
        cy.waitUntil(() => cy.get('#mw-admin-content-edit-inner-delete-curent-content-btn').click());
        cy.wait(100);
        cy.waitUntil(() => cy.get('#mw-dialog-holder-mw_confirm_modal').find('.mw-dialog-footer').find('.mw-ui-btn-info').click());


        cy.visit('/admin/view:content/action:pages#action=trash')

        cy.waitUntil(() => cy.get('.item-title').get('h5').find('a').contains(randomName ).parents('.card-body').first().find('.btn-outline-danger').first().click());
        cy.waitUntil(() => cy.get('#mw-dialog-holder-mw_confirm_modal').find('.mw-dialog-footer').find('.mw-ui-btn-info').click());


        cy.waitUntil(() => cy.get('.item-title').get('h5').find('a').contains(randomName ) .should('have.length', 0));

        cy.waitUntil(() => cy.visit('/admin/view:content'));




        cy.wait(1000);
        cy.waitUntil(() => cy.get('.js-search-by-keywords').get('input.js-search-by-keywords-input').type(randomName));
        cy.waitUntil(() => cy.get('.js-search-by-keywords').get('input.js-search-by-keywords-input').type('{enter}'));
        cy.wait(1000);
        cy.waitUntil(() => cy.get('.no-items-box').should('have.length', 1));


    })


})
