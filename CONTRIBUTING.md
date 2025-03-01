# Contributing

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

## Cloudflare

1. Create a [Cloudflare Pages project](https://developers.cloudflare.com/pages/)
2. The first build **will fail**, this is normal, we'll fix it later
3. Go to project settings and create a variable: `NODE_VERSION` = `23.7.0`
4. Add `nodejs_compat` to compatibility flags
5. Redeploy your project

### What is nextra?

Nextra is a documentation builder that uses Next.js and Markdown. ([MDX](https://mdxjs.com/))
