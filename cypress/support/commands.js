// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "cypress-localstorage-commands";
import 'cypress-wait-until';
import 'cypress-iframe';
import 'faker';




Cypress.Commands.add("dragTo", { prevSubject: "element" }, (subject, targetEl) => {
    cy.wrap(subject)
   // .trigger('mousedown', {  which: 1, force: true,bubbles:false })
		.trigger("dragstart");


	  cy.get(targetEl)
		//.trigger('mouseup', {  which: 1, force: true,bubbles:false })
		.trigger("drop");
  }
);


Cypress.Commands.add('login', (userType, options = {}) => {

    if(!cy.getCookie('back_to_admin')){
	//cy.clearCookies()

	const username = Cypress.env('username')
	const password = Cypress.env('password')




    cy.request({
        method: 'POST',
        url: "/api/user_login",
        body: {

                username: username,
                password: password,

        }
    })
        .its('body')
        .then((body) => {
            // cy.setLocalStorage("accessToken", body.accessToken);
            // cy.setLocalStorage("refreshToken", body.refreshToken);
        });


	cy.getCookie('laravel_session', {timeout: 3000}).should('exist')
    }
});


Cypress.Commands.add('moduleContactFormDisableCaptcha', () => {

	cy.wait(1500)

	cy.get('.mw-admin-go-live-now-btn').invoke('removeAttr', 'target').click();

	cy.visit('/contacts')

	cy.get('div[data-type=contact_form]').scrollIntoView({ duration: 1000 , offset: {top: -400}})

	// cy.get('div[data-type=contact_form]').find('h4').scrollIntoView({ duration: 1000 , offset: {top: -300}}).click()

	cy.window().then((win) => {


	cy.get('div[data-type=contact_form]')
     .should('have.attr', 'id')
     .then((id) => {

		var modal_contact_form = win.mw.tools.open_global_module_settings_modal('contact_form/admin', id)

		 cy.wait(1500)
		 .get('.mw-dialog-container')
		 .find('iframe').first().iframe()
		 .find('input[name=disable_captcha]').click({force:true}).then(() => {
			modal_contact_form.remove()
			// cy.visit('/contacts')
		 });

     })


	});
});

Cypress.Commands.add("iframe", { prevSubject: "element" }, $iframe => {
  Cypress.log({
    name: "iframe",
    consoleProps() {
      return {
        iframe: $iframe,
      };
    },
  });

  return new Cypress.Promise(resolve => {
    onIframeReady(
      $iframe,
      () => {
        resolve($iframe.contents().find("body"));
      },
      () => {
        $iframe.on("load", () => {
          resolve($iframe.contents().find("body"));
        });
      }
    );
  });
});

function onIframeReady($iframe, successFn, errorFn) {
  try {
    const iCon = $iframe.first()[0].contentWindow,
      bl = "about:blank",
      compl = "complete";
    const callCallback = () => {
      try {
        const $con = $iframe.contents();
        if ($con.length === 0) {
          // https://git.io/vV8yU
          throw new Error("iframe inaccessible");
        }
        successFn($con);
      } catch (e) {
        // accessing contents failed
        errorFn();
      }
    };

    const observeOnload = () => {
      $iframe.on("load.jqueryMark", () => {
        try {
          const src = $iframe.attr("src").trim(),
            href = iCon.location.href;
          if (href !== bl || src === bl || src === "") {
            $iframe.off("load.jqueryMark");
            callCallback();
          }
        } catch (e) {
          errorFn();
        }
      });
    };
    if (iCon.document.readyState === compl) {
      const src = $iframe.attr("src").trim(),
        href = iCon.location.href;
      if (href === bl && src !== bl && src !== "") {
        observeOnload();
      } else {
        callCallback();
      }
    } else {
      observeOnload();
    }
  } catch (e) {
    // accessing contentWindow failed
    errorFn();
  }
}


Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key))
})

Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value)
  })
})



Cypress.Commands.add('contentTestGetLinksToVisitFromSitemap', () => {


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


return links_to_visit;

})







Cypress.Commands.add('mwTestCheckForMessedTagsInHtmlBody', () => {




    cy.get('body').should('have.length', 1)
    cy.get('tag').should('have.length', 0)
    cy.contains('mw_replace').should('have.length', 0)


    cy.get('.module').then((module) => {
    cy.get('.module').should('have.attr', 'data-type')
    cy.get('.module').should('have.attr', 'id')

    })

    cy.get('.edit').then((module) => {
    cy.get('.edit').should('have.attr', 'field')
    cy.get('.edit').should('have.attr', 'rel')
    })

})



Cypress.Commands.add('mwLoginToAdminPanelNotLogged', () => {



  cy.visit('/admin')


  cy.get('body')
      .then(($body) => {
          // synchronously query from body
          // to find which element was created
          if ($body.find('input[name=username]').length) {


              cy.clearCookies()

              const username = Cypress.env('username')
              const password = Cypress.env('password')


              cy.get('input[name=username]').clear().invoke('val', username)

              // {enter} causes the form to submit
              cy.get('input[name=password]').clear().invoke('val', password).type(`{enter}`)

              // we should be redirected to /dashboard
              cy.url().should('include', '/admin')


              cy.getCookie('laravel_session', {timeout: 3000}).should('exist')


              cy.get('.module-site-stats-admin', {timeout: 15000}).should('exist')
              //  cy.get('.mw-logout-link', {timeout: 5000}).should('exist')
              cy.get('#mw-admin-main-navigation', {timeout: 15000}).should('exist')


              cy.wait(1000)





          }


      })
      .then((selector) => {

      })





})
Cypress.Commands.add('mwBeforeEach', () => {



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
    cy.intercept('POST', '*/module/*', (req) => {
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


    cy.intercept('GET', '*/api/*', (req) => {
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