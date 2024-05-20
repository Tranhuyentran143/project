import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { URL_USER } from 'src/constant/url.constant';

@Injectable()
export class RoleGuard implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const url = req.baseUrl;
      const role = user.role;

      if (role == 'admin' || URL_USER[url]) {
        next();
        return;
      }

      res.status(404).end();
    } catch (err) {
      res.status(404).json('Token invalid!!!');
    }
  }
}
