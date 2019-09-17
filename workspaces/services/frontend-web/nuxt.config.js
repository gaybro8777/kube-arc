export default {
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    },
    {
      rel: "preload",
      as: "style",
      onload: "this.rel='stylesheet'",
      href: "https://fonts.googleapis.com/css?family=Montserrat:400,500,700"
    }
  ],
  buildModules: ["@nuxt/typescript-build"]
};
