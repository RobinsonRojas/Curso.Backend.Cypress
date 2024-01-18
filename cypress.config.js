const { defineConfig } = require('cypress')
const postgres = require('postgres')

const sql = postgres(
	'postgresql://RobinsonRojas:LPlOEudA2HV1@ep-red-mud-a44n8han.us-east-1.aws.neon.tech/dbPrueba?sslmode=require'
)

async function queryDB(query) {
	//const result = await sql`select version()`;
	switch (query) {
		case 'Consulta1':
			return (result1 = await sql`SELECT * FROM public.playing_with_neon`)
			break

		case 'Consulta2':
			return (result2 = await sql`select version()`)
			break

		default:
			return (result3 = null)
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

