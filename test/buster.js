var config = exports;

config["utils tests"] = {
    
    // or "node"
    environment: "browser",
    rootPath: "../",
    libs: ["src/assets/base/fetch.js"],
//    libs: ["require.js", "config.js"],
//    extensions: [require('buster-amd')],
//    "buster-amd": {
//        pathMapper: function (path) {
//          return path.
//                 // remove extension
//                 replace(/\.js$/, "").
//                 // replace leading slash with previous directory for test files
//                 replace(/^\//, "../");
//        }
//    },
    sources: ["src/assets/utils/*.js"],
    tests: ["test/utils/*-test.js"]
}

//config["widget/com tests"] = {
//    environment: "browser",
//    rootPath: "../",
//    libs: ["src/assets/base/fetch.js"],
//    sources: ["src/widget/com/*.js"],
//    tests: ["test/widget/com/*-test.js"]
//}
//
//config["widget/ui tests"] = {
//    environment: "browser",
//    rootPath: "../",
//    libs: ["src/assets/base/fetch.js"],
//    sources: ["src/widget/ui/*.js"],
//    tests: ["test/widget/ui/*-test.js"]
//}
