import { Module } from '@nestjs/common';
import { FetchModule } from './fetch/fetch.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AwsModule } from './aws/aws.module';
import config from './config';

@Module({
  imports: [
    FetchModule,
    AwsModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    })
  ],
  providers: [AppService],
})
export class AppModule {}
