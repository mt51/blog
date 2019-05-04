import * as Koa from 'koa';
import XiaoceService from '../services/XiaoCeService';

const xiaoce = new XiaoceService();

class XiaoceController {
  get CotrollerName () {
    return 'xiaoceController';
  }

  async getBookList(ctx: Koa.Context) {
    const [data] = await xiaoce.getBookList();
    ctx.body = {
      data,
      code: 0,
    };
  }

  async getSectionList(ctx: Koa.Context) {
    const bookId:string = ctx.params.bookId;
    const [data] = await xiaoce.getSectionList(bookId);
    ctx.body = {
      data,
      code: 0,
    };
  }

  async getArticle(ctx: Koa.Context) {
    const sectionId:string = ctx.params.sectionId;
    const [data] = await xiaoce.getArticle(sectionId);
    ctx.body = {
      data,
      code: 0,
    };
  }
}

export default new XiaoceController();
