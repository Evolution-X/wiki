# Contributing

1. Fork this repository
2. [Setup your environment](#setting-up-your-environment)
3. [Learn about Nextra's components and features](#built-in-components) that you may use
4. Make your changes
5. [Preview your changes locally](#local-development)
6. Make a pull request

## Setting up your environment

> [!TIP]
> Bun is like NPM, but 20x faster

1. [Install bun](https://bun.sh/docs/installation)
2. Node >=23 is required ([install nodejs](https://nodejs.org/en/download))

## Local Development

First install the dependencies using bun:

```bash
bun install
```

You can start the development server using bun to preview the website (supports hot reload):

```bash
bun run dev
```

## Evolution Settings Script

The `generate_settings.py` script fetches preferences in [`Evolution-X/packages_apps_Evolver/res/xml`](https://github.com/Evolution-X/packages_apps_Evolver/tree/vic/res/xml) and converts them to Markdown.

1. Install modules

    ```bash
    pip install -r requirements.txt
    ```

2. Run the generator

    ```bash
    py ./generate_settings.py
    ```

## Deploying to Cloudflare

> [!TIP]
> Other hosting providers (such as [vercel](https://vercel.com/)) will work!

1. Create a [Cloudflare Pages project](https://developers.cloudflare.com/pages/)
2. The first build **will fail**, this is normal, we'll fix it later
3. ~~Go to project settings and create a variable: `NODE_VERSION` = `23.7.0`~~ (not needed; cloudflare will use `.node-version`)
4. Add `nodejs_compat` to compatibility flags
5. Redeploy your project

## Nextra

### What is nextra?

Nextra is a documentation builder that uses Next.js and Markdown. ([MDX](https://mdxjs.com/))

> [!TIP]
> Visit [nextra.site](https://nextra.site/) to see all it's features!

### How does it work?

- Each time the source changes, Cloudflare (or any other host) will redeploy it and generate optimized static pages that are pre-rendered as static HTML.
- [MDX](https://mdxjs.com/) is turbocharged Markdown that lets you write interactive JSX components into MDX pages.

### Built-in Components

You will probably be using these components and features when writing guides or etc.:

- [Callouts](https://nextra.site/docs/built-ins/callout)
- [Steps](https://nextra.site/docs/built-ins/steps)
- [Tabs](https://nextra.site/docs/built-ins/tabs)
- [Syntax Highlighting](https://nextra.site/docs/guide/syntax-highlighting) (supports highlighting lines, adding filenames, etc.)
- [Markdown](https://nextra.site/docs/guide/markdown#github-flavored-markdown)

### Inserting Images

If you write:

```markdown
![Evolution X Icon](/icon.svg)
```

It will render:

![Evolution X Icon](/public/icon.svg)

If you add an asset, please be sure to put the image in the right folder, for example:

```markdown
![GitHub favicon](/favicons/gfav.png)
```

You will have to place your image in `/public/favicons/gfav.png`
