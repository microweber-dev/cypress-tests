describe('Admin edit settings', function () {


    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: ["back_to_admin", "laravel_session"]
        });

        cy.mwBeforeEach();


    })


    it('Editing users settings ', async function () {


        const faker = require('faker');
        var randomText1 = faker.name.findName() + ' - ' + faker.datatype.number(); // Harry Potter
        var randomText2 = faker.animal.cat() + ' - ' + faker.datatype.number(); // Harry Potter
        var randomText3 = faker.animal.horse() + ' - ' + faker.datatype.number(); // Harry Potter


          cy.mwLoginToAdminPanelNotLogged();



















        cy.visit('/admin/view:settings#option_group=users').then(async (contentWindow) => {




            await cy.wait(1000);
            await cy.waitUntil(() => cy.get('i.mdi-login').should('exist'));

            //enable_user_registration

            var input_fields_for_click = [
                'input[type="checkbox"][name=enable_user_registration]',
                'input[type="checkbox"][name=registration_approval_required]',
                'input[type="checkbox"][name=form_show_first_name]',
                'input[type="checkbox"][name=form_show_last_name]',
                'input[type="checkbox"][name=form_show_password_confirmation]',
                'input[type="checkbox"][name=form_show_newsletter_subscription]',
                'input[type="checkbox"][name=captcha_disabled]',
                'input[type="checkbox"][name=disable_registration_with_temporary_email]',
            ];

            const input_fields_checked = [];


            await cy.waitUntil(() => cy.get('i.mdi-login').should('exist'));




            // await cy.waitUntil(() => cy.get('input[type="checkbox"]'));
            // var getCheckboxes1 = cy.waitUntil(() => cy.get('input[type="checkbox"]'));
            //
            //





            cy.get('input[type="checkbox"]').then(elem => {
                // elem is the underlying Javascript object targeted by the .get() command.
                var xyz = Cypress.$(elem).val();
               //  console.log(Cypress.$(elem))
                var is_checked = Cypress.$(elem).prop("checked");
                if (!is_checked) {
                    is_checked = elem.checked
                }
                console.log(elem)

                if (is_checked) {
                    console.log('Checknat e ')
                 //   console.log(input_fields_checked)

                    input_fields_checked.push(Cypress.$(elem).attr('name'));
                }

            })




            console.log(input_fields_checked);
            return;




















            const getCheckboxes = () =>
                cy.get('input[type="checkbox"]').then(elem => {
                    // elem is the underlying Javascript object targeted by the .get() command.
                    var xyz = Cypress.$(elem).val();
                    //console.log(Cypress.$(elem))
                    var is_checked = Cypress.$(elem).prop("checked");
                    if (!is_checked) {
                        is_checked = elem.checked
                    }
                    if (is_checked) {
                        console.log('Checknat e ')
                        console.log(input_fields_checked)

                        input_fields_checked.push(Cypress.$(elem).attr('name'));
                    }

                })


            // lets get elements
            Cypress.Promise.all([
                getCheckboxes(),
            ]).then(([checkboxes]) => {
                cy.log('Check all')
                //  cy.log(checkboxes)

                console.log(input_fields_checked);


                // checkboxes.each((i, elem, $list) => {
                //     var xyz = Cypress.$(elem).val();
                //
                //     var is_checked = Cypress.$(elem).prop("checked");
                //     if(!is_checked){
                //         is_checked = elem.checked
                //     }
                //     if(is_checked){
                //         input_fields_checked.push(Cypress.$(elem).attr('name'));
                //     } else {
                //         Cypress.$(elem).next().click()
                //     }
                //
                // })

            })


        })


        cy.visit('/admin/view:content/action:settings').then((contentWindow) => {


            cy.get('.select-settings', {timeout: 15000}).should('exist')
            cy.wait(1000);
             cy.waitUntil(() => cy.get('a').contains('Login & Register').click());




            cy.wait(1000);
            cy.waitUntil(() => cy.get('i.mdi-login').should('exist'));


            //     cy.waitUntil(() => cy.get('input[type="checkbox"]').should('be.checked'));


        })


        return;

        cy.visit('/admin/view:content/action:settings')


        cy.wait(1000);

        const getCheckboxes2 = () =>
            cy.get('input[type="checkbox"]').then(elem => {

            })


        // lets get elements
        Cypress.Promise.all([
            getCheckboxes2(),
        ]).then(([checkboxes2]) => {
            cy.log('Un Check all')

            checkboxes2.each((i, elem, $list) => {
                var xyz = Cypress.$(elem).val();

                var is_checked = Cypress.$(elem).prop("checked");
                if (!is_checked) {
                    is_checked = elem.checked
                }
                if (is_checked) {
                    Cypress.$(elem).next().click()
                }

            })

        })

        //
        // input_fields_for_click.forEach(function(sel) {
        //
        //     cy.waitUntil(() => cy.get('.mw-settings-list-users').find(sel).next().click());
        //     cy.wait(100);
        //
        // })
        // cy.visit('/admin/view:content/action:settings')
        // cy.get('.select-settings', {timeout: 15000}).should('exist')
        //
        // cy.waitUntil(() => cy.get('a[href="#option_group=users"]').click());
        //
        // cy.wait(1000);
        // cy.waitUntil(() => cy.get('i.mdi-login').should('exist'));

        //    cy.wait('@showAll');

        //     cy.waitUntil(() => cy.get('input[type="checkbox"]').should('not.be.checked'));
        return;


        cy.get('input[type="checkbox"]').wait((elem) => {
            // In this within, the root is now the ul DOM element
            var xyz = Cypress.$(elem).val();
            //console.log(Cypress.$(elem))
            var is_checked = Cypress.$(elem).prop("checked");
            if (!is_checked) {
                is_checked = elem.checked
            }
            if (is_checked) {


                input_fields_checked.push(Cypress.$(elem).attr('name'));
            }

        })


        cy.waitUntil(() => cy.get('input[type="checkbox"]')).then(elem => {
            // elem is the underlying Javascript object targeted by the .get() command.
            var xyz = Cypress.$(elem).val();
            //console.log(Cypress.$(elem))
            var is_checked = Cypress.$(elem).prop("checked");
            if (!is_checked) {
                is_checked = elem.checked
            }
            if (is_checked) {


                input_fields_checked.push(Cypress.$(elem).attr('name'));
            }


        }).as('firstTodo').then(elem => {
            console.log(elem)
        });

        cy.wait(100)
        cy.waitUntil(() => cy.get('@firstTodo'));

        console.log('Checked')
        console.log(input_fields_checked)
        // cy.waitUntil(() =>cy.get('.module-settings-group-users').find(sel)
        //     .invoke('val')  // for input or textarea, .invoke('val')
        //     .then(val => {
        //         input_fields_vals_before_click[sel] =val
        //     }));


        /*
                cy.waitUntil(() => cy.get('.module-settings-group-website').find('input[name=website_title]').clear().type(randomText1).type('{enter}'));
                cy.waitUntil(() => cy.get('.module-settings-group-website').find('textarea[name=website_description]').clear().type(randomText2).blur());
                cy.waitUntil(() => cy.get('.module-settings-group-website').find('input[name=website_keywords]').clear().type(randomText3).type('{enter}'));


                cy.wait(3000);;



                cy.visit('/admin/view:content')
                cy.wait(1000);;
                cy.visit('/admin/view:content/action:settings')
                cy.waitUntil(() => cy.get('a[href="#option_group=website"]').click());
                cy.wait(1000);;


                cy.waitUntil(() => cy.get('.module-settings-group-website').find('input[name=website_title]').invoke("val").should("eq", randomText1));
                cy.waitUntil(() => cy.get('.module-settings-group-website').find('textarea[name=website_description]').invoke("val").should("eq", randomText2));
                cy.waitUntil(() => cy.get('.module-settings-group-website').find('input[name=website_keywords]').invoke("val").should("eq", randomText3));
        */

    })


})
