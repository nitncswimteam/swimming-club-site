import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "奈良高専水泳部",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'tui-editor/dist/tui-editor.css',
    'tui-editor/dist/tui-editor-contents.css', 
    'codemirror/lib/codemirror.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/vue-lazy-load", mode: 'client'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  generate: {
    fallback: true,
  },
}
