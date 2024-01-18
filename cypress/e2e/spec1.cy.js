/// <reference types="Cypress" />

describe('Probando peticiones REST', () => {
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

	it('Validando el body', () => {
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

	it('Validando mensaje de error', () => {
		cy.request({
			url: 'https://api.escuelajs.co/api/v1/categoriesxxx',
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).eq(404)
			expect(response.body.error).contain('Not Found')
		})
	})

	it('Validando crear un empleado', () => {
		cy.request({
			method: 'POST',
			url: 'employees',
			body: {
				first_name: 'xxx',
				last_name: 'xxxx',
				email: 'xxxxxxx@platzi.com',
			},
		}).then((response) => {
			expect(response.status).eq(201)
			expect(response.body).to.have.property('id')

			const id = response.body.id

			cy.wrap(id).as('id')
		})
	})

	it('Validando usuario creado, editarlo y eliminarlo', function () {
		cy.request(`employees/${this.id}`)
			.its('body.first_name')
			.should('eq', 'xxx')

		cy.request('PATCH', `employees/${this.id}`, { first_name: 'xxx2' }).then(
			(response) => {
				cy.log(response.body)
			}
		)

		cy.request('DELETE', `employees/${this.id}`)
			.end()
			.request({ url: `employees/${this.id}`, failOnStatusCode: false })
			.its('status')
			.should('eq', 404)
	})
})
