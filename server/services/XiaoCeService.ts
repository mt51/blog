
import pool from '../../mysql';
export default class XiaoceService {
  get ServiceName() {
    return 'xiaoceservice';
  }

  async getBookList() {
    return pool.query('SELECT * from books');
  }

  async getSectionList(bookId:string) {
    return pool.query(`SELECT id, title, bookId from sections where bookId = '${bookId}'`);
  }

  async getArticle(sectionId:string) {
    return pool.query(`SELECT * from sections where id = '${sectionId}'`);
  }
}
