# webpack5-template
使用Webpack5+Typescript构建的vue3.0/React应用程序，仅供学习Webpack5进行参考。
  
默认main分支为Vue3.0，react分支为React

该示例集成了Less、Typescript、Eslint、FontAwesome字体图标，支持热更新，Webpack5编译速度更快。

### 目录


---```config```

---|---```webpack.base.config.js```

---|---```webpack.dev.config.js```

---|---```webpack.prod.config.js```

---```public```

---|---```index.html```

---```src```

---|----```assets```

---|----```entry```

---|--------```App.vue```

---|----```pages```

---|--------```......```

---|----```router```

---|--------......

---|----```styles```

---|--------......

---|----```index.ts```

---|----```typings.d.ts```

---|----......


### 说明
1. **```webpack.base.config.js```**: webpack基础配置文件，包含development环境和production环境公共配置部分。
2. **```webpack.dev.config.js```**: webpack本地运行环境配置文件。
3.  **```webpack.prod.config.js```**: webpack生产环境配置文件，包含抽取css样式进单独文件、css压缩优化、js压缩优化、静态资源文件处理···
### 本地运行
1. 安装依赖
```bash
npm install
```
2. 运行项目
```bash
npm run serve
```
### 项目打包
```bash
npm run build
```



