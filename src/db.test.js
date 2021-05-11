import { expect } from 'chai'
import { getUserByUsername} from './db'

import { getDatabaseData, restDatabase, setDatabaseData } from './testHelpers'


describe('getUserByUsername', () => {
    it('get the correct user from the database given a username', () => {
            // putting in fake data objects
                const fakeData = [{
                    id:'123',
                    username:'abc',
                    email:'abc@gmail.com'
                },
            {
                id:'124',
                username:'wrong',
                email: 'wrong@wrong.com'
            }]
            await setDatabaseData('users', fakeData)
            const actual = await getUserByUsername('abc')
            const finalDbState = await getDatabaseData('users')
            await restDatabase()
          
            const expected = {
                id:'123',
                username:'abc',
                email:'abc@gmail.com'
            }
            expect(actual).excludingEvery('_id').to.deep.equal(expected)
            expect(finalDbState).excludingEvery('_id').to.deep.equal(fakeData)
    })
})