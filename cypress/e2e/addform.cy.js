describe('Add Farm Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input[data-testid="email"]').type('test@test.com');
        cy.get('input[data-testid="password"]').type('123456{enter}');
        cy.get('div[data-testid="newFormBut"]').click();
        
        cy.get('input[data-testid="displayname"]').as('displayname');
        cy.get('input[data-testid="name"]').as('name');
        cy.get('input[data-testid="phone"]').as('phone');
        cy.get('input[data-testid="open_hours"]').as('hours');
    })

    it('displays & hides error as required', () => {
        // should display error if the field has no value and is blurred
        cy.get('@displayname').focus().blur();
        cy.contains(/Please enter a valid display name/i);

        cy.get('@name').focus().blur();
        cy.contains(/Please enter a valid name/i);

        cy.get('@phone').focus().blur();
        cy.contains(/phone must be a valid phone number for region US/i);
    })

    it('add farm check', () => {
        cy.get('@displayname').type('New farm display name');
        cy.get('@name').type('New farm name');
        cy.get('@phone').type('4342483219');
        cy.get('@hours').type('9 am to 6 pm{enter}');

        // cy.get('div[data-testid="logoutBut"]').should('be.visible')
    })
})