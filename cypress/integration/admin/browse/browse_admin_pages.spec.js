describe('The Admin Page', function () {

    //
    beforeEach(() => {
      //  cy.login();

      //  cy.wait(300)
    });

    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: [ "back_to_admin", "laravel_session" ]
        });
    })



    it('successfully loads and logs in ', function () {

        Cypress.Cookies.debug(true) // now Cypress will log when it alters cookies
        cy.visit('/admin')



        cy.get('body')
            .then(($body) => {
                // synchronously query from body
                // to find which element was created
                if ($body.find('input[name=username]').length) {















                    cy.clearCookies()




                    const username = Cypress.env('username')
                    const password = Cypress.env('password')


                    cy.get('input[name=username]').type(username)

                    // {enter} causes the form to submit
                    cy.get('input[name=password]').type(`${password}{enter}`)

                    // we should be redirected to /dashboard
                    cy.url().should('include', '/admin')


                    cy.getCookie('laravel_session', {timeout: 3000}).should('exist')


                    cy.get('.module-site-stats-admin', {timeout: 5000}).should('exist')
                    //  cy.get('.mw-logout-link', {timeout: 5000}).should('exist')
                    cy.get('#mw-admin-main-navigation', {timeout: 5000}).should('exist')


                    cy.wait(3000)





                }


            })
            .then((selector) => {

            })








    })

    it('Visiting admin pages ', function () {
        cy.visit('/admin/view:content')
        cy.get('#pages_edit_container', {timeout: 5000}).should('exist')


        cy.visit('/admin/view:content/action:pages')
        cy.wait(300)
        cy.get('#pages_edit_container', {timeout: 5000}).should('exist')

        cy.visit('/admin/view:content/action:posts')
        cy.wait(300)
        cy.get('#pages_edit_container', {timeout: 5000}).should('exist')
        cy.get('#pages_edit_container_content_list', {timeout: 5000}).should('exist')


        cy.visit('/admin/view:content/action:products')
        cy.wait(300)
        cy.get('#pages_edit_container', {timeout: 5000}).should('exist')
        cy.get('#pages_edit_container_content_list', {timeout: 5000}).should('exist')

        cy.visit('/admin/view:content/action:categories')
        cy.wait(300)
        cy.get('#pages_edit_container', {timeout: 5000}).should('exist')
        cy.get('#mw-ui-category-selector-manage', {timeout: 5000}).should('exist')

        cy.visit('/admin/view:content/action:settings')
        cy.wait(300)
        cy.get('#settings_admin_mw-content-backend-settings-admin', {timeout: 5000}).should('exist')

    })


    it('Visiting admin shop pages ', function () {
        cy.visit('/admin/view:shop')
        cy.wait(300)
        cy.get('#pages_edit_container', {timeout: 5000}).should('exist')
        cy.get('#pages_edit_container_content_list', {timeout: 5000}).should('exist')



        cy.visit('/admin/order')
        cy.wait(300)
        cy.get('#manage-orders-menus', {timeout: 5000}).should('exist')

        cy.visit('/admin/customers')
        cy.wait(300)
        cy.contains('New client', {timeout: 5000})

        cy.visit('/admin/view:shop/action:options#option_group=shop/settings')
        cy.wait(300)
        cy.get('#settings-admin-mw-main-module-backend-settings-admin-shop-settings', {timeout: 5000}).should('exist')

    })

    it('Visiting all settings admin pages ', function () {

        cy.visit('/admin/view:settings#option_group=all')
        cy.wait(300)
        cy.get('.module-settings-group-website-group', {timeout: 5000}).should('exist')

        cy.visit('/admin/view:shop/action:options#option_group=shop/payments/currency')
        cy.wait(300)
        cy.get('#mw_curr_rend', {timeout: 5000}).should('exist')



        cy.visit('/admin/view:content/action:settings#option_group=template')
        cy.wait(300)
        cy.get('.mw-site-theme-selector', {timeout: 5000}).should('exist')


        cy.visit('/admin/view:content/action:settings#option_group=email')
        cy.wait(300)
        cy.get('.js-holder-email-server-settings', {timeout: 5000}).should('exist')

        cy.visit('/admin/view:content/action:settings#option_group=website')
        cy.wait(300)
        cy.get('#js-upload-logo-image', {timeout: 5000}).should('exist')


        cy.visit('/admin/view:content/action:settings#option_group=files')
        cy.wait(300)
        cy.get('.mw-file-browser', {timeout: 5000}).should('exist')



        cy.visit('/admin/view:content/action:settings#option_group=language')
        cy.wait(300)
        cy.get('.js-search-lang-text', {timeout: 5000}).should('exist')






        cy.visit('/admin/view:content/action:settings#option_group=users')
        cy.wait(300)
        cy.get('#enable_user_registration', {timeout: 5000}).should('exist')


        cy.visit('/admin/view:content/action:settings#option_group=privacy')
        cy.wait(300)
        cy.get('.module-contact-form-privacy-settings', {timeout: 5000}).should('exist')




        cy.visit('/admin/view:content/action:settings#option_group=shop/coupons/admin')
        cy.wait(300)
        cy.get('.module-coupons-settings', {timeout: 5000}).should('exist')



        cy.visit('/admin/view:content/action:settings#option_group=shop/shipping/admin')
        cy.wait(300)
        cy.get('.module-shop-shipping-admin', {timeout: 5000}).should('exist')



        cy.visit('/admin/view:content/action:settings#option_group=shop/offers/admin_block')
        cy.wait(300)
        cy.get('.module-shop-offers', {timeout: 5000}).should('exist')

        cy.visit('/admin/view:content/action:settings#option_group=shop/taxes/admin')
        cy.wait(300)
        cy.get('.module-shop-taxes-admin', {timeout: 5000}).should('exist')



        cy.visit('/admin/view:content/action:settings#option_group=shop/payments/admin')
        cy.wait(300)
        cy.get('.module-shop-payments-admin', {timeout: 5000}).should('exist')

         cy.visit('/admin/view:content/action:settings#option_group=shop/orders/settings/setup_emails_on_order')
        cy.wait(300)
        cy.get('.module-shop-orders-settings-setup-emails-on-order', {timeout: 5000}).should('exist')


        cy.visit('/admin/view:content/action:settings#option_group=shop/orders/settings/other')
        cy.wait(300)
        cy.get('.module-shop-orders-settings-other', {timeout: 5000}).should('exist')



    })



    it('Visiting all modules ', function () {

        var modules_admin_url = ['contact_form'];


        modules_admin_url.forEach(async function(m) {


            cy.visit('/admin/view:modules/load_module:'+m)
            cy.wait(300)
            cy.get('.module-contact-form', {timeout: 5000}).should('exist')


        })






    })
})


