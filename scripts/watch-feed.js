import path from 'path'
import { fileURLToPath } from 'url'
import chokidar from 'chokidar'
import { spawn } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')
const watchPath = path.join(rootDir, 'content/feed')

const runBuild = () =>
  new Promise((resolve, reject) => {
    const child = spawn('node', [path.join(__dirname, 'build-feed.js')], {
      stdio: 'inherit',
      cwd: rootDir,
    })
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`build exited ${code}`))))
  })

let timer = null
const schedule = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    timer = null
    runBuild().catch((e) => console.error(e))
  }, 200)
}

await runBuild()

chokidar.watch(watchPath, { ignoreInitial: true }).on('all', () => {
  console.log('[watch-feed] content changed, rebuilding…')
  schedule()
})

console.log(`[watch-feed] watching ${watchPath}`)
