import { Module } from '@nestjs/common';
import { HoroService } from './services/horo.service';
import { PixabayService } from './services/pixabay.service';
import { PexelsService } from './services/pexels.service';

@Module({
  providers: [HoroService, PixabayService, PexelsService],
  exports: [HoroService, PixabayService, PexelsService],
})
export class FetchModule {}
