# kuvaify

kuvaify is a simpel, clean and dependency free JavaScript lightbox gallery plugin with rotate, zoom and click and drag functionality.

## How to use

1. Include the css and js file. [Example document](https://github.com/janlonden/kuvaify/blob/gh-pages/index.html)

2. Initialize: `var mykuvaify = kuvaify({})`

3. Customize:

```
var mykuvaify = kuvaify({
  linkElement: 'body',
  fileTypes: ['jpg', 'jpeg', 'png', 'gif'],
  coverScreen: true,
  showShortcuts: true,
  transitionSpeed: 400,
  transitionOverlap: 0,
  transitionScale: 0.02,
  zoomRatio: 0.2,
  smallSize: 768,
  mediumSize: 1280
})
```

## Options

**linkElement**

Choose the element that contain the links you want kuvaify to show.

```
linkElement: '#my-element'
```

**fileTypes**

Which file types should be included?

```
fileTypes: ['jpg', 'jpeg', 'png', 'gif']
```

**coverScreen**

By default images are stretched to cover the screen. Set to false to disable.

```
coverScreen: true
```

**showShortcuts**

Set to false to disable shortcut help text for desktop users in the menu.

```
showShortcuts: true
```

**transitionSpeed**

Fade in and out transition animation time in ms. A minimum value of 100 is required.

```
transitionSpeed: 400
```

**transitionOverlap**

Fade in and out transition overlap amount. Takes a value between 0 and 1. Lower values equals more overlap. A value of 1 should increase performance.

```
transitionOverlap: 0
```

**transitionScale**

Set the amount of scaling in animation.

```
transitionScale: 0.02
```

**zoomRatio**

Set the amount of zoom per step.

```
zoomRatio: 0.2
```

**smallSize and mediumSize**

kuvaify uses the urls found in the links `data-kuvaify-small` and `data-kuvaify-medium` attributes if the screen width is lower than `smallSize` or `mediumSize` respectively.

```
smallSize: 768,
mediumSize: 1280
```

```
<a href="large.jpg" data-kuvaify-small="small.jpg" data-kuvaify-medium="medium.jpg">Image</a>
```

**Caption**

To add a caption you can you use the `data-kuvaify-caption` attribute in your link.

```
<a href="img.jpg" data-kuvaify-caption="Caption text here">Image</a>
```

## Demo

Go to the [project page](http://janlonden.github.io/kuvaify/) for a demo.