import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-edge',
      converter: 'edge',
      incrementalCache: 'cloudflare-kv',
      tagCache: 'cloudflare-kv',
      queue: undefined,
      wrapperEnv: {
        WORKER_SELF_REFERENCE: undefined,
      },
    },
  },
}

export default config
