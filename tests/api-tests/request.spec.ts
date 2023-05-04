//run on 3 
//npx playwright test ./tests/api-tests/request.spec.ts

//npm run testC ./tests/api-tests/request.spec.ts

// GET Auth method
import { expect, test } from "@playwright/test";

test('Autorization', async ({ request }) => {
    const auth = { username: 'user', password: 'pass' };
    const authentication = await request.get(`https://httpbin.org/basic-auth/user/pass`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${auth.username}:${auth.password}`).toString('base64')}`,            
        }
    });    
    expect(authentication.ok()).toBeTruthy()
    console.log(`Response status: ${authentication.status()}`);
});

//POST delay response
test('Returns a delayed response based on value set "max 10 sec"', async ({ request }) => {
    const time = ['7'];
    const delayedRequest = await request.post(`https://httpbin.org/delay/${time}`, {headers: {
        'Accept': 'application/json',
    }  

    });  
    expect(delayedRequest.ok()).toBeTruthy()
    console.log(`Response status: ${delayedRequest.status()}`);
});