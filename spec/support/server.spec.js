var request = require('request');
describe('get messages from foodtruck data. ', () =>{
it('should return 200 Ok', (done) => {
    request.get('http://localhost:3005/v1/foodtruck/', (err, res) =>{
         //console.log(res.body);
        expect(JSON.parse(res.body).length).toBeGreaterThan(0)
        done();
    })
})

it('foodtruck should be stabbin wagon', (done) =>{
    request.get('http://localhost:3005/v1/foodtruck/5be40427fff85103fc53fde5', (err, res) => {
//   console.log(JSON.parse(res.body).name);   
    expect(JSON.parse(res.body).name).toEqual('Tahu foodtusck')       
    done();
    })
})
})
