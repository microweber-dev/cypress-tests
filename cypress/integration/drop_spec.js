/// <reference types="Cypress" />

describe('Page test', () => {
	it('successfully loads', () => {
		cy.login('admin');
		cy.wait(1500);
		cy.visit('cc?editmode=y')
		cy.wait(1500);




		//cy.get('body').within(($body) => {


		cy.get('.mw-lslayout-tab', { timeout: 1000 }).click({ force: true });
		cy.wait(1500);
		cy.get('div[rel="content"]', { timeout: 3000 }).first().as('dropTarget');
		cy.get('div[field="footer-left"]', { timeout: 3000 }).first().as('dropTarget2');


		cy.get('#mw-sidebar-modules-and-layouts-holder', { timeout: 3000 }).find('li').first().as('firstLayout');



	//	cy.get('@dropTarget').invoke('attr', 'draggable', true)
	//	cy.get('@firstLayout').invoke('attr', 'draggable', true)


		cy.wait(1500);
// var el_x =	cy.get('body').get('@firstLayout').offsetWidth ;
// var el_y =	cy.get('body').get('@firstLayout').offsetHeight  ;

	 //	cy.get('body').get('@firstLayout')
		//	.trigger('mousedown', {  which: 1, force: true,bubbles:false })
		//	.trigger('mousemove', { which: 1 , pageX: 5, pageY: 137,bubbles:false })
//cy.get('.mw-control-box').invoke('removeAttr', 'class')

// cy.get('body').get('@firstLayout').trigger('mousedown', { which: 1   })
// .trigger('mousemove', {  clientX: 410, clientY: 200  })
// .trigger('mouseup', {   })



		//
		//
		// cy.get('body').find('div[rel="content"]').first()
		// 	.trigger('mousemove', { clientX: 200, clientY: 300, which: 1 , force: true,bubbles:false })
		// 	.trigger('mouseup', {which: 1 , force: true,bubbles:false });


// 	cy.get('@firstLayout').dragTo('@dropTarget2');

		// cy.get('body')
		// 	.trigger('mousemove', {   pageX: 150 , pageY: 1152})
		// 	.trigger('mousedown', { which: 1 })
		// 	.trigger('mousemove', { which: 1 , pageX: 5, pageY: 560,force: true })
		// 	.trigger('mouseup', { which: 1 });



			// .trigger('mousedown')
			// .trigger('mousemove', {clientX: 500, clientY: 50})
			//  .trigger('mouseup')

		//.drag('div[field="dream_content"]', 'top');



		//	})






	})
})
