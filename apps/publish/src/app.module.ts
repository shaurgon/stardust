import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { VkModule } from '@stardust/common';

@Module({
  imports: [
    VkModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env.publish',
      isGlobal: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
