# Forkify App

<details>
 <summary><strong>Table of Contents</strong> (click to expand)</summary>
  
  - [Overview](#overview)
    - [Technologies used](#technologies-used)
    - [Installation steps](#installation-steps)
  - [Challenges faced](#challenges-faced)
  - [Learning outcomes](#learning-outcomes)
  - [Screenshots](#screenshots)
  - [Directory structure](#directory-structure)
  - [Collaboration](#collaboration)
  - [Contact me](#contact-me)
  
</details>

## Overview

Forkify app is a web app where users can search through more than 1 million recipes to find what they need. It shows all the necessary ingredients and how to make the dish. The users can bookmark their favourite recipes as well as add their own ones to the website. It has a beautiful and feature rich UI. The website is fully response in variety of screen sizes.

Live preview: [Link](https://forkify.darshanvaishya.xyz/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/5e90623e-a903-425a-8292-98b20c3f3e80/deploy-status)](https://app.netlify.com/sites/loving-hugle-52e1c6/deploys)

### Technologies used

- HTML
- SASS (SCSS)
- TypeScript
- Forkify API
- AJAX
- Local storage API
- FormData API
- Webpack
- Babel

### Installation steps

Requirements: `node` and `npm`

If you want to use NPM, then replace `yarn` with `npm` in all of the commands.

OR

If you do not have `yarn` installed, install it using

```sh
npm install yarn -g # add sudo in mac and linux
```

Now

```sh
git clone https://github.com/DarshanVaishya/forkify-app
cd forkify-app
yarn install
yarn run build # To generate files
yarn run start # To start a local server
```

## Challenges faced

When performing data update, I realized that I was re-rendering the whole elements. This was bad for performance as well as having a flicker effect. To overcome this, I created a DOM update algorith, which only changes the elements which have their data changed.

```ts
// Had to use any as a lot of different data relied on this update
update(data: any) {
	this.data = data;
	const newMarkup = this.generateMarkup();

	const newDOM = document.createRange().createContextualFragment(newMarkup);
	const newEls = Array.from(newDOM.querySelectorAll("*"));
	const curEls = Array.from(this.parentElement.querySelectorAll("*"));

	for (let i = 0; i < curEls.length; i++) {
		if (curEls[i].isEqualNode(newEls[i])) continue;

		if (newEls[i].firstChild?.nodeValue.trim() !== "")
			curEls[i].textContent = newEls[i].textContent;

		Array.from(newEls[i].attributes).forEach((attr) => {
			curEls[i].setAttribute(attr.name, attr.value);
		});
	}
}
```

Another challenge was to upload new recipes to the API. I learnt that fetch API can be used to upload data as well. I used the `POST` method for uploading.

```ts
fetch(url, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(uploadData),
});
```

## Learning outcomes

This project was a big undertaking for me, as I have never worked on a project of this scale. I learned a lot about the Model View Controller (MVC) Architecture. And for an added challenge, I made this project in Typescript.

My knowledge in Asynchronous JavaScript was strengthened. I realized and understood the need for TypeScript and how it helps in preventing bugs and unexpected behaviour.

## Screenshots

### Open Graph card

![Open Graph](/src/img/screenshots/og-tag.png)

### Main screen

![main](/src/img/screenshots/main.png)

### Search screen

![search](/src/img/screenshots/search.png)

### Recipe screen

![recipe](/src/img/screenshots/recipe.png)

### Bookmarks screen

![bookmarks.png](/src/img/screenshots/bookmarks.png)

## Directory structure

```
.
├── babel.config.json
├── package.json
├── README.md
├── src
│   ├── img
│   │   ├── favicon.png
│   │   ├── icons.svg
│   │   ├── logo.png
│   │   ├── og-image.png
│   │   └── screenshots
│   │       ├── bookmarks.png
│   │       ├── main.png
│   │       ├── og-tag.png
│   │       ├── recipe.png
│   │       └── search.png
│   ├── sass
│   │   ├── _base.scss
│   │   ├── _components.scss
│   │   ├── _header.scss
│   │   ├── main.scss
│   │   ├── _preview.scss
│   │   ├── _recipe.scss
│   │   ├── _searchResults.scss
│   │   └── _upload.scss
│   ├── template.html
│   └── ts
│       ├── controller.ts
│       ├── model.ts
│       ├── util
│       │   ├── config.ts
│       │   ├── helpers.ts
│       │   └── interfaces.ts
│       └── views
│           ├── addRecipeView.ts
│           ├── bookmarksView.ts
│           ├── paginationVIew.ts
│           ├── previewView.ts
│           ├── recipeView.ts
│           ├── resultView.ts
│           ├── searchView.ts
│           └── view.ts
├── tsconfig.json
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── yarn.lock

7 directories, 39 files
```

## Collaboration

If you have found a bug, suggesting an improvement or want to collaborate then please raise an [issue](https://github.com/DarshanVaishya/forkify-app/issues) or create an [pull request](https://github.com/DarshanVaishya/forkify-app/pulls).

## Contact me

- [Twitter](https://twitter.com/darshan_vaishya)
- [LinkedIn](https://www.linkedin.com/in/darshan-vaishya-ba99001a9/)
