// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import { UserEntity } from '../core/entity/user.entity';
// import { UserService } from 'src/modules/user/user.service';
// import { ExtendedRequest } from 'src/interface/extended-request.interface';

// type UserDecode = {
//   userName: string;
//   address: string;
// };

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   async use(req: ExtendedRequest, res: Response, next: NextFunction) {
//     const token = req.header('Authorization');
//     try {
//       const userDecode = jwt.verify(
//         token,
//         process.env.API_SECRET_KEY,
//       ) as UserDecode;
//       const { userName, address } = userDecode;

//       const userQuery = new UserEntity();
//       userQuery.userName = userName;
//       userQuery.address = address;

//       const userFind = await UserService.getUserByQuery(userQuery);

//       if (!userFind) {
//         res.status(404).json('User not found!!!');
//       }
//       req.user = userFind;
//       next();
//     } catch (err) {
//       res.status(404).json('Token invalid!!!');
//     }
//   }
// }
