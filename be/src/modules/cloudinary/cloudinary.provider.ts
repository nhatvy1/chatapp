import { v2 } from 'cloudinary';
export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'metavere',
      api_key: '861726529933798',
      api_secret: '-YjT4_flbgKHC4B9lhvkR4Hz87w',
    });
  },
};