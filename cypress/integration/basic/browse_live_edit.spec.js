describe('Browsing Pages In Live Edit', function () {


    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: ["back_to_admin", "laravel_session"]
        });


        cy.intercept('POST', '**/pingstats*', {
            statusCode: 200,
            body: 'it worked!',
        })
        cy.intercept('get', '**/csrf*', {
            statusCode: 200,
            body: '',
        })

        //  cy.intercept('POST', '*/*').as('showAll')
        // from https://glebbahmutov.com/cypress-examples/6.6.0/commands/network-requests.html#cy-intercept
        let duration
        cy.intercept('POST', '**/*', (req) => {
            if (req === null) {
                return;
            }

            const started = +new Date()
            req.reply(() => {
                // we are not interested in modifying the response
                // just measuring the elapsed duration
                duration = +new Date() - started
            })
        }).as('showAll')


        if (duration) {
            cy.wait('@showAll').should('include.keys', [

                'response',
            ])
        }

    })


    it('Visiting pages ', function () {


        cy.mwLoginToAdminPanelNotLogged();


        cy.contentTestGetLinksToVisitFromSitemap().then(links_to_visit => {


            links_to_visit.forEach(function (m) {

                if (m === '') {
                    return;
                }
                cy.visit(m + '?editmode=y')
                cy.wait(1000);

                cy.waitUntil(() => cy.get('body').should('have.class', 'loaded'));

                //

                cy.mwTestCheckForMessedTagsInHtmlBody();
                //  cy.window().then((win) => {
                cy.get('.edit .module').each(($el, index) => {


                    cy.window().then((win) => {


                        cy.log('Settings for ' + $el.attr('id'))
                        if (!$el.attr('id')) {
                            return;
                        }

                        if (!win.mw.drag) {
                            return;
                        }
                        var modal = win.mw.drag.module_settings('#' + $el.attr('id'), "admin");


                        var dialog_iframe = modal.dialogContainer.querySelector('iframe');

                        var iframeId = modal.iframe.getAttribute('id');
                        if (!iframeId) {
                            var iframeId = win.mw.id();
                            modal.iframe.setAttribute('id', iframeId);
                        }


                        //   console.log(win.mw.$(dialog_iframe).find('iframe','.mw-dialog-container').attr('id'));
                        console.log(modal.id);
                        console.log(modal.iframe.getAttribute('id'))

                        cy.frameLoaded('#' + iframeId)


                        cy.get('#' + iframeId)
                            .then(function ($iframe) {
                                cy.wait(300);


                                const $jbody = $iframe.contents().find('body')
                                const $body = $jbody[0]


                                cy.wrap($body).should('have.class', 'loaded')


                                cy.mwTestCheckForMessedTagsInHtmlBody();
                                cy.wrap($body).find('.mw-iframe-auto-height-detector').should('exist')

                                cy.waitUntil(() => cy.wrap($body).find('#settings-container').should('be.visible'));
                                cy.waitUntil(() => cy.wrap($body).find('.module[module_settings="true"]').should('be.visible'));
                                cy.waitUntil(() => cy.wrap($body).find('#mw_reload_this_module_popup_form').should('be.hidden'));

                                cy.wait(3000);

                                cy.waitUntil(() => cy.get('.mw-dialog-close').click());

                                cy.wait(300);
                                //  cy.get('.mw-dialog-close').click()


                            })


                        //    cy.iframe('#'+iframeId).find('body').should('be.visible')


                        // // You can also give it a selector to find elements inside of a specific iframe
                        // cy.enter('#'+iframeId).then(getBody => {
                        //   //  cy.waitUntil(() =>     getBody().should('have.class','loaded'));
                        //
                        //     getBody().find('body').should('be.visible')
                        //   //  getBody().contains('Some hidden element').should('not.be.visible')
                        // })


                        // console.log(dialog_iframe);
                        // console.log(dialog_iframe.contentWindow);
                        //
                        // cy.waitUntil(() => cy.get(dialog_iframe).should('be.visible'));
                        //
                        //
                        //
                        // cy.get(dialog_iframe)
                        //  cy.wait(300);
                        //  cy.waitUntil(() =>     cy.get('body').should('have.class','loaded'));


                    })


                    //   cy.log($el.attr('id'));


                })


                //})

                //   cy.wait(30000);

                // return;
            })

        })


    })


})
