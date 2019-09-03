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

	cy.clearCookies()
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

	cy.getCookie('laravel_session', {timeout: 3000}).should('exist')

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
