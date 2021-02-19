import { Inject, Injectable, Logger } from '@nestjs/common';

import { VK_CONNECTION } from './vk.constants';
import { SignGroups, vkError } from './vk.interface';

@Injectable()
export class VkService {
  private readonly logger: Logger = new Logger(VkService.name);

  @Inject(VK_CONNECTION)
  private vk: any;

  async uploadWallPhotoByUrl(photoUrl: string, sign: string): Promise<string[]> {
    try {
      const ownerId = SignGroups[sign];
      let fileData = await this.vk.uploader
        .upload({
          getUrlMethod: 'photos.getWallUploadServer',
          getUrlParams: {
            group_id: ownerId,
          },
          saveMethod: 'photos.saveWallPhoto',
          saveParams: {
            group_id: ownerId,
            // server, hash подставятся автоматически
          },
          file: photoUrl,
          isWeb: true,
        })
        .catch(this.errorHandler);
      fileData = fileData[0];
      this.logger.log(`attachment: photo${fileData.owner_id}_${fileData.id}`);
      return [`photo${fileData.owner_id}_${fileData.id}`];
    } catch (error) {
      this.logger.error(error);
    }
  }

  async postMessage(sign: string, textMessage: string, photos?: string[]): Promise<any> {
    const ownerId = SignGroups[sign];
    return await this.vk
      .post('wall.post', {
        owner_id: -ownerId,
        message: textMessage,
        ...(photos && { attachments: photos.join(',') }),
        from_group: 1,
        v: '5.130',
      })
      .catch(this.errorHandler);
  }

  async pinMessage(sign: string, post_id: number): Promise<boolean> {
    const ownerId = SignGroups[sign];
    const result = await this.vk
      .post('wall.pin', {
        owner_id: -ownerId,
        post_id,
      })
      .catch(this.errorHandler);
    return !!result;
  }

  errorHandler(e: vkError) {
    this.logger.error(e.error_msg);
  }
}
