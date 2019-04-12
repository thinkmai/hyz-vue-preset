const os = require("os");
const fs = require("fs");
const path = require("path");

module.exports = (api, options, rootOptions) => {
  // 命令
  api.extendPackage({
    scripts: {
      start: "vue-cli-service serve --open"
    }
  });

  // 项目依赖
  api.extendPackage({
    dependencies: {
      "hyz-components": "^0.4.3",
      iview: "^3.3.2"
    }
  });

  api.extendPackage({
    devDependencies: {
      "xml-loader": "^1.2.1"
    }
  });

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith("src/") || path.startsWith("public/"))
      .forEach(path => delete files[path]);
  });

  // 生成项目文件
  api.render("./templates/default");

  // 屏蔽 generator 之后的文件写入操作
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
  });
};
