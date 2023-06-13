import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AzureADB2CStrategy } from './aadb2c.strategy';

/**
 * @module AuthModule
 * @description Module for authentication with Azure AD B2C
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'oauth-bearer' })],
  providers: [AzureADB2CStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
