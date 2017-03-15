# d2l-seek-bar

A Polymer seek bar to use with audio and video players.

## Usage

* Install [bower-art-resolver](https://www.npmjs.com/package/bower-art-resolver).
* Create a `.bowerrc` file in your project:
```
{
	"registry": {
		"search": [
			"https://ro-dev:AP3hK9qVHxhdvdFwPeGMw2bj5eWeuDJZuRCdBB@d2lartifacts.artifactoryonline.com/d2lartifacts/api/bower/bower-local",
			"https://bower.herokuapp.com"
  		]
	},
	"resolvers": [
		"bower-art-resolver"
	]
}
```
* Install `d2l-seek-bar` with Bower.
* Run `npm install`
* Run `bower install`
* Import and use the component:
```
<link rel="import" href="path/to/bower_components/d2l-seek-bar/d2l-seek-bar.html">

...

<d2l-seek-bar value="40"></d2l-seek-bar>
```

## Development

* `npm install`
* `npm start`
* Visit http://localhost:9998/components/d2l-seek-bar/demo/
