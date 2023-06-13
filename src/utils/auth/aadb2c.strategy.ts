import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class AzureADB2CStrategy extends PassportStrategy(
  BearerStrategy,
  'oauth-bearer',
) {
  private readonly logger = new Logger(`strategy<aad-b2c>`, {
    timestamp: true,
  });
  constructor() {
    super({
      identityMetadata:
        'https://tofuplatformdev.b2clogin.com/tofuplatformdev.onmicrosoft.com/b2c_1_tofu_dev/v2.0/.well-known/openid-configuration',
      clientID: '23daa2f4-2044-4049-98d1-f8b406e6a9df',
    });
  }

  validate(payload: any) {
    this.logger.debug(`validate(): Enter`);
    this.logger.debug(`validate(): $payload = ${JSON.stringify(payload)}`);
    try {
      if (!payload.sub) throw new UnauthorizedException();
      return payload.sub;
    } catch (error) {
      this.logger.error(`validate(): ${error}`);
      throw error;
    }
  }
}
