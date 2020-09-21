# Open Graph Image as a Service with Sinhala Support. 

> aka dynamic image card generator

<a href="https://twitter.com/vercel">
    <img align="right" src="https://og-image.vercel.app/tweet.png" height="300" />
</a>

Serverless service that generates dynamic Open Graph images that you can embed in your `<meta>` tags.

For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result which gets cached.

See the image embedded in the tweet for a real use case.


## What is an Open Graph Image?

Have you ever posted a hyperlink to Twitter, Facebook, or Slack and seen an image popup?
How did your social network know how to "unfurl" the URL and get an image?
The answer is in your `<head>`.

The [Open Graph protocol](http://ogp.me) says you can put a `<meta>` tag in the `<head>` of a webpage to define this image.

It looks like the following:

```html
<head>
  <title>Title</title>
  <meta property="og:image" content="http://example.com/logo.jpg" />
</head>
```

## Why use this service?

The short answer is that it would take a long time to painstakingly design an image for every single blog post and every single documentation page. And we don't want the exact same image for every blog post because that wouldn't make the article stand out when it was shared to Twitter. 

That's where `og-image.vercel.app` comes in. We can simply pass the title of our blog post to our generator service and it will generate the image for us on the fly!

It looks like the following:

```html
<head>
  <title>Hello World</title>
  <meta property="og:image" content="https://gen-og-image.vercel.app/සීලක්ඛන්ධවග්ගපාළි%20දීඝ%20නිකාය.png?fontFamily=arundathee" />
</head>
```

Now try changing the text `සීලක්ඛන්ධවග්ගපාළි%20දීඝ%20නිකාය.png?fontFamily=arundathee` to the title of your choosing and watch the magic happen ✨

[![example png](https://gen-og-image.vercel.app/සීලක්ඛන්ධවග්ගපාළි%20දීඝ%20නිකාය.png?fontFamily=arundathee)](https://gen-og-image.vercel.app/සීලක්ඛන්ධවග්ගපාළි%20දීඝ%20නිකාය.png?fontFamily=arundathee)


Font Families:
```
?fontFamily=abhaya
```
Available fonts: 

`abhaya`, `alakamanda`, `arundathee`, `basuru`, `bindumathi`, `davasa`, `derana`, `dharanee`, `disapamok`, `ganganee`, `gemunu`, `gurulugomi`, `imanee`, `indeewaree`, `isiwara`,`malithi`, `rajantha`, `rashmi`, `samantha`, `sandhyanee`


<a href="https://vercel.com/new/project?template=vercel/og-image"><img width="128" src="https://vercel.com/button" align="right"></a>

# [Credits: Vercel](https://vercel.app)

Forked from Open Graph Image as a Service on [vercel/og-image](https://github.com/vercel/og-image)