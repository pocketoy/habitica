import nconf from 'nconf';
import express from 'express';
import http from 'http';
import logger from './libs/logger';

// Setup translations
// Must come before attach middlewares so Mongoose validations can use translations
import './libs/i18n';

// Load config files
import './libs/setupMongoose';

// jyhan 매우 중요한 수정임 도대체 왜 본사이트에서는 에러가 안나는지 신기할 정도임
// 아마 mongoose 버젼 차이 때문이 아닌가 의심됨 하여튼 뭔가 버젼 차이가 있는 것 같음
import attachMiddlewares from './middlewares/index';
import './libs/setupPassport';


// Load some schemas & models
import './models/challenge';
import './models/group';
import './models/user';

const server = http.createServer();
const app = express();

app.set('port', nconf.get('PORT'));

attachMiddlewares(app, server);

server.on('request', app);
server.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}`);
});

export default server;
