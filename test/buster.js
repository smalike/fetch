var config = exports;

config["Fetch tests"] = {
    
    // or "node"
    environment: "browser",
    rootPath: "../",
//    libs: ["src/assets/base/*.js"],
    libs: ["require.js", "config.js"],
    extensions: [require('buster-amd')],
    "buster-amd": {
        pathMapper: function (path) {
          return path.
                 // remove extension
                 replace(/\.js$/, "").
                 // replace leading slash with previous directory for test files
                 replace(/^\//, "../");
        }
    },
    sources: ["js/*.js"],
    tests: ["test/*-test.js"],
}

// Add more configuration groups as needed