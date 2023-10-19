import { defineConfig } from 'astro/config'
import vercel from 'astro-vercel-edge'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel()
})
