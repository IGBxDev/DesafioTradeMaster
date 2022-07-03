import { Knex} from 'knex'

export async function up(knex: Knex): Promise<void>{
    return await knex.schema.createTable('EntertainmentStatus', (table)=>{
        table.increments('Id').primary().unique().notNullable()
        table.text('Description').notNullable()
        table.boolean('Active').notNullable().defaultTo(1)
    })
}