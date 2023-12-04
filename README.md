# @brightspace-ui-labs/seek-bar

A Polymer seek bar to use with audio and video players.

## Usage

* Ensure you have the correct .npmrc file in your project or home directory
* Run `npm install`
* Import and use the component:
```
import '@brightspace-ui-labs/seek-bar/d2l-seek-bar.js';
...

<d2l-seek-bar value="40"></d2l-seek-bar>
```

## Developing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

To start a [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) that hosts the demo page and tests:

```shell
npm start
```

### Linting

```shell
npm run lint
```

### Testing

```shell
# lint & run headless unit tests
npm test

# unit tests only
npm run test:headless

# debug or run a subset of local unit tests
npm run test:headless:watch
```

### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.
