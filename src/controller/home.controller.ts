import { App, Inject, Controller, Get, ContentType } from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';

import { render } from '../vite.server';

@Controller('/')
export class HomeController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/')
  @Get('/about')
  @Get('/links')
  @Get('/article')
  @Get('/article/:cname')
  @Get('/article/detail/:id')
  @Get('/works')
  @Get('/works/detail/:id')
  @Get('/topics')
  @Get('/topics/detail/:cname')
  @Get('/tag/:cname')
  @Get('/search/:keyword')
  @Get('/500')
  @Get('/404')
  @ContentType('text/html')
  async home(): Promise<void> {
    this.ctx.body = render(this.ctx, this.app);
  }
}
