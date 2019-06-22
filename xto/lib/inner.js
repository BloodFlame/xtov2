/**
 * Created with JetBrains WebStorm.
 * User: xadillax
 * Date: 9/10/13
 * Time: 2:24 AM
 * xto - To track your express.
 */
require('sugar');
let spidex = require('spidex');
let qs = require('querystring');
let zlib = require('zlib');

spidex.setDefaultUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) ' +
                           'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                           'Chrome/40.0.2214.94 Safari/537.36');
const baseUri = 'https://m.kuaidi100.com/query?';

/**
 * query for express
 * @param {String} num post id
 * @param {String} company company type
 * @param {Function} callback the callback function
 */
exports.query = function(num, company, callback) {
    getWWWID(num, company, callback);
};

function getWWWID(num, company, callback) {
    const homeUrl = 'https://m.kuaidi100.com';
    spidex.get(homeUrl, function(data, status, respheader) {
        let cookie = respheader['set-cookie'];
        post(num, company, cookie, callback);
    });
}

function post(num, company, cookie, callback) {
    let queryObject = {
        postid: num,
        id: 1,
        valicode: '',
        temp: Math.random(),
        type: company,
        phone: '',
        token: '',
        platform: 'MWWW'
    };

    let header = {
        Host: 'm.kuaidi100.com',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        Origin: 'https://m.kuaidi100.com',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        Referer: 'https://m.kuaidi100.com/result.jsp?nu=97553246939',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        Cookie: cookie
    };

    let url = baseUri + qs.stringify(queryObject);

    spidex.post(url, {
        timeout: 60000,
        charset: 'binary',
        header: header
    }, function(data, status/**, respheader*/) {
        if (status !== 200) {
            return callback(new Error('Server returns a wrong status. ' + status));
        }

        zlib.unzip(data, function(err, buff) {
            if (err) return callback(err);
            data = buff.toString('utf8');

            let json;
            try {
                json = JSON.parse(data);
            } catch (e) {
                return callback(e);
            }

            if (undefined === json.data) {
                let msg = json.message || 'Unknown error.';
                if (msg.indexOf('：') !== -1) {
                    msg = msg.substr(msg.indexOf('：') + 1);
                }
                return callback(new Error(msg));
            }

            return callback(undefined, json);
        });
    }).on('error', callback);
}
