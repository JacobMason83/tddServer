import sinon from 'sinon'
import request from 'supertest'
import { expect } from 'chai'
import db from './db'
import app from './server'

describe('get /users/:username', () => {
    it('sends the correct response when a user with username is found', async () => {
        const fakeData = {
            id:'123',
            username:'abc',
            email:'abc@gmail.com'
        }
        const stub = sinon 
        .stub(db, 'getUserByUsername')
        .resolves(fakeData)
        // how you want it to respond 
        await request(app).get('/users/abc')
        .expect(200)
        .expect('Content-type', /json/)
        .expect(fakeData)

        expect(stub.getCall(0).args).to.equal('abc')


        stub.restore()
    })
    it('sends the correct response when there is an error', async () => {
        const fakeError = { message: "Something went wrong!"}
        
        const stub = sinon.stub(db, 'getUserByUsername')
        .throws(fakeError)

        request(app).get('users/abc')
        .expect(500)
        .expect('Content-type', /json/)
        .expect(fakeError)

        stub.restore()
    })
    it('returns the appropriate response when the user is not found', async () => {
        const stub = sinon.stub(db, 'getUserByUsername')
            .resolves(null);

        await request(app).get('/users/def')
            .expect(404);

        stub.restore();
    });
})