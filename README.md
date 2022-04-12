# d2l-seek-bar

A Polymer seek bar to use with audio and video players.

## Usage

* Ensure you have the correct .npmrc file in your project or home directory
* Run `npm install`
* Import and use the component:
```
import '../@d2l/seek-bar/d2l-seek-bar.js';
...

<d2l-seek-bar value="40"></d2l-seek-bar>
```

## Development

* `npm install`
* `npm start`
* Visit http://localhost:9998/components/@d2l/seek-bar/demo/

## Versioning

All version changes should obey [semantic versioning](https://semver.org/) rules.

Releases use the [semantic-release](https://semantic-release.gitbook.io/) tooling and the [angular preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for commit message syntax. Upon release, the version in `package.json` is updated, a tag and GitHub release is created and a new package will be deployed to NPM.

Commits prefixed with `feat` will trigger a minor release, while `fix` or `perf` will trigger a patch release. A commit containing `BREAKING CHANGE` will cause a major release to occur.

Other useful prefixes that will not trigger a release: `build`, `ci`, `docs`, `refactor`, `style` and `test`. More details in the [Angular Contribution Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).
