import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '030698',
      //dropSchema: true, 
      database: 'aipdatabase',
      entities: [User],
      synchronize: true,
  }),
  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
