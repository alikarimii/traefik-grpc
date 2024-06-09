import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGrpcController } from './app.controller.grpc';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, AppGrpcController],
  providers: [AppService],
})
export class AppModule {}
