describe('Probando Apis', () => {
	it('Validar el header y el content type', () => {
		cy.request('/employees')
			.its('headers')
			.its('content-type')
			.should('include', 'application/json')
	})

	it('Validando el status code', () => {
		cy.request('employees').its('status').should('eq', 200)

		cy.request({ url: 'employees/10', failOnStatusCode: false })
			.its('status')
			.should('eq', 404)
	})

	it('probado el body', () => {
		cy.request('employees/1')
			.its('body')
			.its('first_name')
			.should('eq', 'Javier')
	})
})
