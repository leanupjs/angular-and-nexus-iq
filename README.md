<p style="text-align: center; background: white;">
  <a href="https://leanupjs.org">
    <img src="https://leanupjs.org/assets/logo.svg" height="250">
  </a><br>
  <h2 style="text-align: center;">
    <cite><b>Make things pure</b> ... to become lean.</cite>
  </h2>
</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/du_BnIZzEKs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
<hr>

[![license][license]][license-url]
[![lernajs][lernajs]][lernajs-url]
[![prettier][prettier]][prettier-url]
[![@leanup/cli](https://snyk.io/advisor/npm-package/@leanup/cli/badge.svg)](https://snyk.io/advisor/npm-package/@leanup/cli)
[![DepShield Badge](https://depshield.sonatype.org/badges/leanupjs/leanup/depshield.svg)](https://depshield.github.io)

[license]: https://img.shields.io/npm/l/@leanup/cli
[license-url]: https://github.com/leanupjs/cli/blob/master/LICENSE
[lernajs]: https://img.shields.io/badge/managed%20with-lerna-blueviolet
[lernajs-url]: https://lerna.js.org
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://prettier.io

<h1>leanup<sup style="color: grey; font-size: 75%"> js</sup></h1>

The **`@leanup` ecosystem** stands for a lightweight and pure way for application development in JavaScript/TypeScript.

- [Motivation](#motivation)
- [What makes the difference](#what-makes-the-difference)
- [Principles](#principles)
- [Reproduction / Angular + Nexus IQ](#reproduction--angular--nexus-iq)
  - [Hack / Fix for copy-modules-webpack-plugin](#hack--fix-for-copy-modules-webpack-plugin)
  - [Webpack configuration](#webpack-configuration)
  - [Source main.ts toggle](#source-maints-toggle)
  - [Show cases](#show-cases)
    - [Default with Angular without hacks](#default-with-angular-without-hacks)
      - [Result](#result)
    - [Modified for Angular with hack](#modified-for-angular-with-hack)
      - [Result](#result-1)
    - [Default with React without hacks](#default-with-react-without-hacks)
      - [Result](#result-2)
    - [Modified for React with hack](#modified-for-react-with-hack)
      - [Result](#result-3)

## Motivation

- Learnability
- Controllability
- Universality
- Flexibility
- Scalability
- Durability
- Transparency

## What makes the difference

> <cite>Stop the transitive knowledge.</cite>

We use the minimal configuration and build no overhead stuff on top of the popular tools and make every native command transparent.

## Principles

- convention over configuration
- pure commands under the hood
- don't repeat yourself
- following the generic instead of the influenced way
- keep the dependencies always up to date

## Reproduction / Angular + Nexus IQ

### Hack / Fix for copy-modules-webpack-plugin

In the folder `./copy-modules-webpack-plugin` is a hacked copy of the module `copy-modules-webpack-plugin@2.2.0`.

### Webpack configuration

The webpack config file `./webpack.config.js` contains a plugin replacement and a framework toggle.

```js
module.exports = (...args) => {
  const config = require('@leanup/stack-angular/webpack.config')(...args);
  //   const config = require('@leanup/stack-react/webpack.config')(...args);

  const CopyModulesWebpackPlugin = require('./copy-modules-webpack-plugin');
  config.plugins.shift(0, 1); // remove copy-modules-webpack-plugin
  config.plugins.unshift(
    new CopyModulesWebpackPlugin({
      destination: '.reports/nexus-iq',
      includePackageJsons: true,
    })
  );

  console.log(config);

  return config;
};
```

### Source main.ts toggle

The entry file `./src/main.ts` contains a framework toggle.

```js
import './angular.main';

// import './react.main';
```

### Show cases

Run execution with `npm start` or `npm run build`.

#### Default with Angular without hacks

`webpack.config.js`

```js
module.exports = (...args) => {
  const config = require('@leanup/stack-angular/webpack.config')(...args);
  //   const config = require('@leanup/stack-react/webpack.config')(...args);

  // const CopyModulesWebpackPlugin = require('./copy-modules-webpack-plugin');
  // config.plugins.shift(0, 1); // remove copy-modules-webpack-plugin
  // config.plugins.unshift(
  //   new CopyModulesWebpackPlugin({
  //     destination: '.reports/nexus-iq',
  //     includePackageJsons: true,
  //   })
  // );

  console.log(config);

  return config;
};
```

`src/main.ts`

```js
import './angular.main';
// import './react.main';
```

##### Result

Module copy in `./.reports/nexus-iq` - ❌ **Fault**.

#### Modified for Angular with hack

`webpack.config.js`

```js
module.exports = (...args) => {
  const config = require('@leanup/stack-angular/webpack.config')(...args);
  //   const config = require('@leanup/stack-react/webpack.config')(...args);

  const CopyModulesWebpackPlugin = require('./copy-modules-webpack-plugin');
  config.plugins.shift(0, 1); // remove copy-modules-webpack-plugin
  config.plugins.unshift(
    new CopyModulesWebpackPlugin({
      destination: '.reports/nexus-iq',
      includePackageJsons: true,
    })
  );

  console.log(config);

  return config;
};
```

`src/main.ts`

```js
import './angular.main';
// import './react.main';
```

##### Result

Module copy in `./.reports/nexus-iq` - ✔️ **Done**.

#### Default with React without hacks

`webpack.config.js`

```js
module.exports = (...args) => {
  // const config = require('@leanup/stack-angular/webpack.config')(...args);
  const config = require('@leanup/stack-react/webpack.config')(...args);

  // const CopyModulesWebpackPlugin = require('./copy-modules-webpack-plugin');
  // config.plugins.shift(0, 1); // remove copy-modules-webpack-plugin
  // config.plugins.unshift(
  //   new CopyModulesWebpackPlugin({
  //     destination: '.reports/nexus-iq',
  //     includePackageJsons: true,
  //   })
  // );

  console.log(config);

  return config;
};
```

`src/main.ts`

```js
// import './angular.main';
import './react.main';
```

##### Result

Module copy in `./.reports/nexus-iq` - ✔️ **Done**.

#### Modified for React with hack

`webpack.config.js`

```js
module.exports = (...args) => {
  // const config = require('@leanup/stack-angular/webpack.config')(...args);
  const config = require('@leanup/stack-react/webpack.config')(...args);

  const CopyModulesWebpackPlugin = require('./copy-modules-webpack-plugin');
  config.plugins.shift(0, 1); // remove copy-modules-webpack-plugin
  config.plugins.unshift(
    new CopyModulesWebpackPlugin({
      destination: '.reports/nexus-iq',
      includePackageJsons: true,
    })
  );

  console.log(config);

  return config;
};
```

`src/main.ts`

```js
// import './angular.main';
import './react.main';
```

##### Result

Module copy in `./.reports/nexus-iq` - ✔️ **Done**.
