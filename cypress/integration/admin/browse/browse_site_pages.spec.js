describe('The Admin Page', function () {



    beforeEach(() => {
        Cypress.Cookies.defaults({
          //  preserve: [ "back_to_admin", "laravel_session" ]
        });


      //  cy.intercept('POST', '*/*').as('showAll')
        // from https://glebbahmutov.com/cypress-examples/6.6.0/commands/network-requests.html#cy-intercept
        let duration
        cy.intercept('POST', '**/*', (req) => {
          const started = +new Date()
          req.reply(() => {
            // we are not interested in modifying the response
            // just measuring the elapsed duration
            duration = +new Date() - started
          })
        }).as('showAll')



        if(duration){
                cy.wait('@showAll').should('include.keys', [
                  'request',
                  'response',
                ])
        }

    })



    it('Visiting pages ', function () {
      cy.visit('/');

        var links_to_visit = [];


        var sitemapFiles = [ 'sitemap.xml/pages', 'sitemap.xml/posts', 'sitemap.xml/products', 'sitemap.xml/categories'];

         //var sitemapFile = Cypress.config().baseUrl + 'sitemap.xml/pages';
        sitemapFiles.forEach(function(m) {
          var sitemapFile = Cypress.config().baseUrl + m;
                 Cypress.$.ajax({
                     type: "GET",
                     async: false,
                     url: sitemapFile,
                     dataType: "xml",
                     success: function(xml) {
                         Cypress.$(xml).find('url').each(function(){
                             var tipo = Cypress.$(this).find('loc').html();
                               links_to_visit.push(tipo);

                         });
                     }
                 });
          })


       links_to_visit.forEach(function(m) {
            cy.visit(m)
             cy.wait(1000);
      })
    })

    // it('Visiting modules ', function () {
    //
    //     var modules_admin_url = ['contact_form','comments','menu','testimonials','tags','users','shop'];
    //
    //
    //
    //     modules_admin_url.forEach(function(m) {
    //
    //         cy.log('Testing module '+ m)
    //
    //         cy.visit('/'+m)
    //         cy.wait(1000);
    //
    //         var mclas =  m.replaceAll('_', '-')
    //         var mclas =  mclas.replaceAll('--', '-')
    //
    //     //    cy.get('.module-'+mclas, {timeout: 5000}).should('exist')
    //
    //
    //     })
    //
    //
    //     var links = Cypress.$('a[href]') ;
    //
    //
    //
    //
    //
    // })
})
