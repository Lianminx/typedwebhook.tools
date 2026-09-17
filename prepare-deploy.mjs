import { cp, mkdir, writeFile } from 'node:fs/promises'

await mkdir('dist/public', { recursive: true })
await cp('ui/.svelte-kit/cloudflare', 'dist/public', {
  recursive: true,
  filter: (source) => !source.endsWith('_worker.js'),
})
await writeFile('dist/public/.assetsignore', '_worker.js\n*.map\n', 'utf8')
