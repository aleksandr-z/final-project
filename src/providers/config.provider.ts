import 'dotenv/config';

class ConfigProvider {
  get(key: string){
    return process.env[key];
  }
}

export const config = new ConfigProvider();