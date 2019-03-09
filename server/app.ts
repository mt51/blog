import * as Koa from 'koa';

const app:Koa = new Koa();

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || 500;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
})

app.use(async (ctx:Koa.Context) => {
  ctx.body = 'Hello world';
});

app.on('error', console.error);

const PORT:number = Number(process.env.PORT) || 3000;

app.listen(PORT);