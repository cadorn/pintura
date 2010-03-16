function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var BUILDER = require("builder/program", "http://registry.pinf.org/cadorn.org/github/pinf/packages/common/");
var JSON = require("json");


var ProgramBuilder = exports.ProgramBuilder = function() {
    if (!(this instanceof exports.ProgramBuilder))
        return new exports.ProgramBuilder();
}
ProgramBuilder.prototype = BUILDER.ProgramBuilder();


ProgramBuilder.prototype.build = function(options) {
    
    var jackupPath = this.targetPackage.getPath().join("bin", "jackup"),
        buildBasePath = this.targetPackage.getPath(),
        dataBasePath = this.targetPackage.getDataPath();


    // determine path to example package
    var programPackageDescriptor = this.targetPackage.getDescriptor(),
        exampleLocator = programPackageDescriptor.getDependencyLocatorForName("example"),
        exampleTopLevelId = exampleLocator.getTopLevelId();


    jackupPath.dirname().mkdirs();
    jackupPath.write([
        "#!/bin/bash",
        "export PATH=" + buildBasePath.join("packages", "narwhal", "bin") + ":$PATH",
        "export PATH=" + buildBasePath.join("packages", "jack", "bin") + ":$PATH",
        "export NARWHAL_HOME=" + buildBasePath.join("packages", "narwhal"),
        "export PACKAGE_HOME=" + buildBasePath,
        "export SEA=" + buildBasePath,
        "jackup " + buildBasePath.join("using", exampleTopLevelId, "jackconfig.js")
    ].join("\n"));


    // ensure commands are executable
    jackupPath.chmod(0755);
    buildBasePath.join("packages", "narwhal", "bin", "narwhal").chmod(0755);
    buildBasePath.join("packages", "jack", "bin", "jackup").chmod(0755);


    // create data directory
    dataBasePath.mkdirs();
    
    
    // update program settings
    var descriptor = JSON.decode(buildBasePath.join("package.json").read().toString());

    descriptor["implements"]["settings"]["dataFolder"] = dataBasePath.valueOf();

    buildBasePath.join("package.json").write(JSON.encode(descriptor, null, "    "));    
}
