import { ServerCredentials } from '@grpc/grpc-js';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './proto/nest.pb';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50600',
      package: protobufPackage,
      loader: { keepCase: true }, // let variable with _ pass through
      protoPath: [join(__dirname, 'proto', 'nest.proto')],
      credentials: ServerCredentials.createSsl(
        Buffer.from(join(__dirname, 'certs', 'ca.pem')),
        [],
      ),
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
