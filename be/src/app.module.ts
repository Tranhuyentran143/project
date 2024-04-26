import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './core/entity/user.entity';
import { ProductEntity } from './core/entity/product.entity';
import { ProductModule } from './modules/products/product.module';
import { CategoryEntity } from './core/entity/category.entity';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'last_project',
      entities: [UserEntity, ProductEntity, CategoryEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
