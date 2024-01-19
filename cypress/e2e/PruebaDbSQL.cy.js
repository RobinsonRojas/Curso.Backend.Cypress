describe('Probando conexión con la BD', () => {
	it('Validando insert', () => {
		cy.task('queryDatabase', 'insert').then((result) => {
			cy.log(result)
		})
	})

	it('Validando select', () => {
		cy.task('queryDatabase', 'select').then((result) => {
			cy.log(result)
		})
	})

	it('Validando update', () => {
		cy.task('queryDatabase', 'update').then((result) => {
			cy.log(result)
		})
	})

	it('Validando select', () => {
		cy.task('queryDatabase', 'select').then((result) => {
			cy.log(result)
		})
	})

	it('Validando delete', () => {
		cy.task('queryDatabase', 'delete').then((result) => {
			cy.log(result)
		})
	})
})
