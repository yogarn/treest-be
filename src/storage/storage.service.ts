import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { supabase } from './storage.config';

@Injectable()
export class StorageService {
  async uploadFile(file: Express.Multer.File) {
    const { data, error } = await supabase.storage
      .from(process.env.STORAGE_BUCKET)
      .upload(`${Date.now()}-${file.originalname}`, file.buffer, {
        cacheControl: '3600',
        upsert: true,
      });
    if (error) {
      throw new InternalServerErrorException(
        'Failed to upload file to Supabase: ' + error.message,
      );
    }
    return data.path;
  }

  async deleteFile(filePath: string) {
    const { data, error } = await supabase.storage
      .from(process.env.STORAGE_BUCKET)
      .remove([filePath]);
    if (error) {
      throw new InternalServerErrorException(
        'Failed to delete file from Supabase: ' + error.message,
      );
    } else if (data && data.length === 0) {
      throw new NotFoundException('No file found');
    }
  }
}
