const { spec, request } = require('pactum');
const assert = require("assert");

request.setDefaultTimeout(10000);

it('The API should be running', async () => {
    await spec()
        .get('https://mindsdb-api.onrender.com/')
        .expectStatus(200);
});

it('The API should return some response to a sample prompt', async () => {
    await spec()
        .post('https://mindsdb-api.onrender.com/summary/')
        .withHeaders('Content-Type', 'application/json')
        .withJson({
            text: 'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.'
        })
        .then(
            res => {
                assert(res.statusCode === 200)
            }
        )
});