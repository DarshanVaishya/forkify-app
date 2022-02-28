# Forkify App (WIP)

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
			if (!curEls[i].isEqualNode(newEls[i])) continue;

			if (newEls[i].firstChild?.nodeValue.trim() !== "")
				curEls[i].textContent = newEls[i].textContent;

			Array.from(newEls[i].attributes).forEach((attr) => {
				curEls[i].setAttribute(attr.name, attr.value);
			});
		}
	}
```

## Learning outcomes

Placeholder

## Screenshots

Placeholder

## Directory structure

```
Placeholder
```

## Collaboration

If you have found a bug, suggesting an improvement or want to collaborate then please raise an [issue](https://github.com/DarshanVaishya/forkify-app/issues) or create an [pull request](https://github.com/DarshanVaishya/forkify-app/pulls).

## Contact me

- [Twitter](https://twitter.com/darshan_vaishya)
- [LinkedIn](https://www.linkedin.com/in/darshan-vaishya-ba99001a9/)
