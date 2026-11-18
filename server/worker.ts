import { handleAcuity } from './acuity';

type Env = { ASSETS: { fetch(request: Request): Promise<Response> } };

export default {
  async fetch(request: Request, env: Env) {
    return (await handleAcuity(new URL(request.url))) ?? env.ASSETS.fetch(request);
  },
};
