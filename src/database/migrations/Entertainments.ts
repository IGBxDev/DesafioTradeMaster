import { Knex } from "knex";

export async function up(knex: Knex): Promise<void>{
    return await knex.schema.createTable('Entertainment', (table) =>{
        table.increments('Id').primary()
        table.text('Name').notNullable()
        table.text('EntertainmentType_Id').notNullable()
        table.foreign('EntertainmentType_Id').references('Entertainment.EntertainmentType_Id').deferrable('deferred')
    })
}