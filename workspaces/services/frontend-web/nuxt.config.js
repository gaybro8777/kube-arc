const path = require("path");
const tsConfig = require("./tsconfig.json");

// Make ts path resolvers for webpack
const { baseUrl } = tsConfig.compilerOptions;
const tsPaths = tsConfig.compilerOptions.paths;
const resolvedTsPaths = {};
Object.keys(tsPaths).forEach(pathName => {
  const [tsPath] = tsPaths[pathName];
  let cleanPathName = pathName.replace(/\*/gi, "");
  cleanPathName =
    cleanPathName[cleanPathName.length - 1] === "/"
      ? cleanPathName.substring(0, cleanPathName.length - 1)
      : cleanPathName;
  const resolvedPath = path.resolve(
    __dirname,
    baseUrl,
    tsPath.replace(/\*/gi, "")
  );
  resolvedTsPaths[cleanPathName] = resolvedPath;
});

console.log("TypeScript resolved paths");
console.log("👇");
console.log(resolvedTsPaths);

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
  buildModules: ["@nuxt/typescript-build"],
  router: {
    middleware: "i18n"
  },
  plugins: [
    {
      src: "~plugins/i18n.js",
      injectAs: "i18n"
    }
  ],
  extends(config) {
    /** SVG as component loader **/
    const urlLoader = config.module.rules.find(
      rule => rule.loader === "url-loader"
    );
    urlLoader.test = /\.(png|jpe?g|gif)$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: "vue-svg-loader",
      options: {
        // optional [svgo](https://github.com/svg/svgo) options
        svgo: {
          plugins: [
            {
              removeDoctype: true
            },
            {
              removeComments: true
            }
          ]
        }
      }
    });
    /** Config END **/

    config.resolve.alias = {
      ...config.resolve.alias,
      ...resolvedTsPaths
    };
  }
};
