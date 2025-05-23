// This is fixes an issue with EACCESS PORT ALREADY IN USE during
// development with node-vite.  TLDR: node-vite is hot reloading the "main.ts" module,
// and it does all this within the same node process (unlike other reload tools!).
// so between saves, there is already a server listening to port 4000!  These events help us
// teardown the side effect that main() has.
// https://github.com/vitest-dev/vitest/issues/2334

import { ViteHotContext } from "vite/types/hot"

export const metaHotTeardown = (
  metahot: ViteHotContext | undefined,
  teardown: () => unknown
) => {
  if (metahot) {
    metahot.on("vite:beforeFullReload", teardown)
    metahot.dispose(teardown)
  }
}
