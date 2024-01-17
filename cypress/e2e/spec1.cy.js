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

	it('Probando todo en un Request', () => {
		cy.request('employees/1').then((response) => {
			expect(response.headers['content-type']).eq('application/json')
			expect(response.status).eq(200)
			expect(response.body.first_name).eq('Javier')
			expect(response.body.email).contain('@platzi.com')
		})
	})
})
