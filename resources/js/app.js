// import './bootstrap';
import { createInertiaApp } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'

/**
 * Imports the given page component from the page record.
 */
 function resolvePageComponent(name, pages) {
    for (const path in pages) {
      if (path.endsWith(`${name.replace('.', '/')}.svelte`)) {
        return typeof pages[path] === 'function'
          ? pages[path]()
          : pages[path]
      }
    }
  
    throw new Error(`Page not found: ${name}`)
  }

InertiaProgress.init()

createInertiaApp({
 // import.meta.glob() (lazy load page components) 
 // import.meta.globEager() (eager load page components) 
  resolve: (name) => resolvePageComponent(name, import.meta.glob('./Pages/**/*.svelte')),
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})