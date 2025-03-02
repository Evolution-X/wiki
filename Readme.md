# [Evolution-X wiki](https://wiki.evolution-x.org) resources.

If you want to help, it's quite simple.
Fork the repo, make your changes, then submit a pull request via [comparing forks](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/comparing-commits#comparing-across-forks) with the main repository; we will review and merge it at our earliest convenience.

## Warning :

Currently, we use `wiki.js` to manage our wiki.
Please keep in mind some things won't work with your favorite markdown editor, but will show properly on the wiki.

For example,

```markdown
<Callout type="error"> This is a blockquote</Callout>
```

This will probably not work in your markdown editor.

Thanks in advance for the help you'll give us, and #KeepEvolving !

## Assets

About assets : if you write for example

```markdown
![image](/image.png)
```

Then it'll consider that the image is located under `Assets/image.png`.

Please be sure to put the image in the right folder

Example :

```markdown
![github favicon](favicons/gfav.png)
```

Then you have to place your image under `Assets/favicons/gfav.png`

## Evolution Settings Script

The `generate_settings.py` script fetches preferences in [`res/xml`](https://github.com/Evolution-X/packages_apps_Evolver/tree/vic/res/xml) and converts them to Markdown.

1. Install modules

```bash
pip install -r requirements.txt
```

2. Run the generator

```bash
py ./generate_settings.py
```
