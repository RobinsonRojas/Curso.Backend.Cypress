const { defineConfig } = require('cypress')
const postgres = require('postgres')

const sql = postgres(
	'postgresql://RobinsonRojas:LPlOEudA2HV1@ep-red-mud-a44n8han.us-east-1.aws.neon.tech/dbPrueba?sslmode=require'
)

async function queryDB(query) {
	//const result = await sql`select version()`;
	switch (query) {
		case 'insert':
			return await sql`INSERT INTO personas(name, apellido) values('Arley', 'Novoa')`
			break

		case 'select':
			return await sql`SELECT * FROM personas`
			break

		case 'update':
			return await sql`UPDATE personas
			SET name = 'AAAAAAAAAAA', apellido = 'NNNNNNNNNN'
			WHERE id = (SELECT max(id) FROM personas)`

		case 'delete':
			return await sql`delete from personas where id = (SELECT max(id) FROM personas)`
			break

		default:
			return null
			break
	}
}

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
			on('task', {
				queryDatabase(query) {
					return queryDB(query)
				},
			})
		},
		baseUrl: 'http://localhost:3000',
	},
})

