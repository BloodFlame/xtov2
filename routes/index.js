const router =  require('koa-router')();
const controller = require('../controller');


router.use('/xto', controller.routes());

module.exports = router;