describe('Probando conexión con la BD', () => {
	it('Validando conexión', () => {
		cy.task('queryDatabase', 'Consulta1').then((response) => {
			cy.log(response)
		})
	})
})
