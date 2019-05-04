import * as Koa from 'koa';
import * as Router from 'koa-router';
import XiaoceController from './controllers/XiaoCeController';

const options: Router.IRouterOptions = {
  prefix: '/xiaoce',
};

const router: Router = new Router(options);

router.get('/', async(ctx: Koa.Context) => {
  ctx.body = 'xiaoce';
});

router.get('/books', XiaoceController.getBookList);

router.get('/getSectionList/:bookId', XiaoceController.getSectionList);

router.get('/getSection/:sectionId', XiaoceController.getArticle);

export default router;
