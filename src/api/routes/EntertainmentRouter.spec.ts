import request from 'supertest'
import app from '../../app'

describe('Teste Entertainment', ()=>{
    it('Should get the all entertainment', async () =>{
        const res = await request(app)
        .get('/entertainment/all')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([] || [{}])
        )
    })


    it('Create entertainment', async () =>{
        const res = await request(app)
        .post('/entertainment/create')
        .set('Content-type', 'application/json')
        .send({ 
                name: "Home Aranha 1",
                entertainmentType_Id: 1, 
                entertainmentStatus_Id: 1, 
                user: 'rafael jest',
                rentDays: 2
            })
            console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("description")
        expect(res.body).toHaveProperty("response")
        expect(res.body.response).toEqual(
            expect.arrayContaining([])
        )


    })
})