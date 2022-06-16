describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[data-testid="email"]').as('email');
        cy.get('input[data-testid="password"]').as('password');
    })

    it('displays & hides email error as required', () => {
        // should display error if the field has no value and is blurred
        cy.get('@email').focus().blur();
        cy.contains(/Please enter a valid email address/i);

        cy.get('@password').focus().blur();
        cy.contains(/Please enter a valid password/i);

        // should hide error when the field is focused
        cy.get("@email").focus();
        cy.contains(/Please enter a valid email address/i).should('not.exist');
    })

    it('login check', () => {
        cy.get('@email').type('test@test.com');
        cy.get('@password').type('123456{enter}');

        cy.get('div[data-testid="logoutBut"]').should('be.visible')
    })
})