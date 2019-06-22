const router = require('koa-router')();
const xto = require('../xto');

function asyncQuery(num, company) {
    return new Promise((resolve, reject) => {
        xto.query(num, company, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

router.post('/query', async (ctx) => {
    let num = ctx.request.body.num;
    let company = ctx.request.body.company;
    try{
        let result = await asyncQuery(num, company);
        ctx.body = {
            code: 200,
            data: result.data
        }
    } catch (e) {
        console.error(e);
        ctx.body = {
            code: 500,
            message: e.message
        }
    }
});

module.exports = router;