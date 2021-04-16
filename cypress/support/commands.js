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



//
// function contentTestGetLinksToVisitFromSitemap() {
//
//   var fruits = ["Banana", "Orange", "Apple", "Mango"];
//
//
//
//   var sitemapFile = Cypress.config().baseUrl + 'sitemap.xml/pages';
//
//   Cypress.$.ajax({
//       type: "GET",
//       async: false,
//       url: sitemapFile,
//       dataType: "xml",
//       success: function(xml) {
//           Cypress.$(xml).find('url').each(function(){
//               var tipo = Cypress.$(this).find('loc').html();
//               if(tipo){
//
//                 if(!fruits.includes(tipo)){
//                 console.log(tipo);
//                 }
//               }
//
//           });
//       }
//   });
//
// }
