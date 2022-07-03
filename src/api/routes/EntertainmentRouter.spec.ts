import request from 'supertest'
import app from '../../app'

describe('Teste Entertainment', ()=>{
    it('Should get the all entertainment', async () =>{
        const res = await request(app)
        .get('/entertainment/all')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('Id')
        expect(res.body).toHaveProperty('Name')
        expect(res.body).toHaveProperty('Type')
    })
})