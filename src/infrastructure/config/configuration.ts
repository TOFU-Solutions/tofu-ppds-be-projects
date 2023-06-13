import { join } from 'path';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';

/**
 * @function
 * @description loading configuration from environment var or else from app.config.yaml
 * @author Mark Leung <markleungcl@lfxdigital.com>
 */
export default () => {
  // getting our config from environment var.
  const CONFIG_FILE =
    process.env.ENV_CONFIG || join(__dirname, 'app.config.yaml');
  return yaml.load(readFileSync(CONFIG_FILE, 'utf-8')) as Record<string, any>;
};
