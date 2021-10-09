import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ViewsController } from './controllers/views.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    AuthModule
  ],
  controllers: [ViewsController],
  providers: [],
})
export class AppModule {}
