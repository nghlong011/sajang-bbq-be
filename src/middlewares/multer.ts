import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${file.fieldname}-${randomName}${fileExtName}`);
};

export const getFileInterceptor = (fieldName: string) => {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: './images',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  });
};
