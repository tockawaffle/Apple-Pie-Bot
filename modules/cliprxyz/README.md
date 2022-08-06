# cliprxyz
Fetch infos from a Twitch clip with [Clipr.xyz](https://clipr.xyz) website.

<a href="https://github.com/luisgbr1el/cliprxyz/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/luisgbr1el/cliprxyz?style=for-the-badge"></a>
<a href="https://github.com/luisgbr1el/cliprxyz/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/luisgbr1el/cliprxyz?style=for-the-badge"></a>
<a href="https://github.com/luisgbr1el/cliprxyz"><img alt="GitHub license" src="https://img.shields.io/github/license/luisgbr1el/cliprxyz?style=for-the-badge"></a>


# Install (with NPM)
```javascript
npm i cliprxyz
```

# Usage
```javascript
const cliprxyz = require("cliprxyz");

cliprxyz.downloadClip("CLIP_URL").then(res => {
    console.log(res)
}).catch(err => {
    console.log(err);
});
```

The package will shows:
```javascript
{
  clipName: 'Shows the clip name',
  clipUrl: 'Shows the clip url',
  creatorUsername: 'Shows the creator username',
  creatorUrl: 'Shows the creator profile url',
  creatorPictureUrl: 'Shows the creator profile picture url',
  creatorWasPlaying: 'Shows what the creator was playing',
  clippedOn: 'Shows the date from when the livestream was clipped'
}
```

## Get the clip name
```javascript
const cliprxyz = require("cliprxyz");

cliprxyz.downloadClip("CLIP_URL").then(res => {
    console.log(res.clipName)
}).catch(err => {
    console.log(err);
});
```

## Get the clip url
```javascript
const cliprxyz = require("cliprxyz");

cliprxyz.downloadClip("CLIP_URL").then(res => {
    console.log(res.clipUrl)
}).catch(err => {
    console.log(err);
});
```

## Get the creator username
```javascript
const cliprxyz = require("cliprxyz");

cliprxyz.downloadClip("CLIP_URL").then(res => {
    console.log(res.creatorUsername)
}).catch(err => {
    console.log(err);
});
```

## Get the creator url
```javascript
const cliprxyz = require("cliprxyz");

cliprxyz.downloadClip("CLIP_URL").then(res => {
    console.log(res.creatorUrl)
}).catch(err => {
    console.log(err);
});
```

## Get the creator profile picture url (300x300)
```javascript
const cliprxyz = require("cliprxyz");

cliprxyz.downloadClip("CLIP_URL").then(res => {
    console.log(res.creatorPictureUrl)
}).catch(err => {
    console.log(err);
});
```

## Get what the creator was playing
```javascript
const cliprxyz = require("cliprxyz");

cliprxyz.downloadClip("CLIP_URL").then(res => {
    console.log(res.creatorWasPlaying)
}).catch(err => {
    console.log(err);
});
```

## Get when the livestream was clipped
```javascript
const cliprxyz = require("cliprxyz");

cliprxyz.downloadClip("CLIP_URL").then(res => {
    console.log(res.clippedOn)
}).catch(err => {
    console.log(err);
});
```


# Author
<a href="https://github.com/luisgbr1el">luisgbr1el</a>
