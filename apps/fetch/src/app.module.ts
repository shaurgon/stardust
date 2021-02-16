import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import config from './config';
import { AwsModule, FetchModule } from '@stardust/common';

@Module({
  imports: [
    FetchModule,
    AwsModule,
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '.env.fetch',
      isGlobal: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
