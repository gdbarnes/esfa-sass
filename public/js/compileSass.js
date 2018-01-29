'use strict';

class compileSass {
  constructor() {
    this.compileButton = document.querySelector('.js-compile-sass');
    this.compileSuccessful = document.querySelector('.js-compile-successful');
    this.npmPackagesContainer = document.querySelector('.js-npm-packages');
    this.headMarkupContainer = document.querySelector('.js-head-markup');

    this.sendToGulp = this.sendToGulp.bind(this);
    this.successfulCompile = this.successfulCompile.bind(this);
    this.getComparisonData = this.getComparisonData.bind(this);
    this.displayVersionResults = this.displayVersionResults.bind(this);

    this.getComparisonData('govuk-elements-sass');
    this.getComparisonData('govuk_frontend_toolkit');

    this.addEventListeners();
  }

  addEventListeners() {
    this.compileButton.addEventListener('click', this.sendToGulp);
  }

  sendToGulp() {
    console.log('Sending...');
    fetch('http://localhost:3000/send', {
      method: 'POST'
    })
      .then(response => console.log(response))
      .catch(error => console.error('Error:', error))
      .then(response => this.successfulCompile());
  }

  successfulCompile() {
    this.compileSuccessful.innerHTML =
      'Sass compiled to <a href="http://localhost:3000/css/esfa-govuk-base.css">esfa-govuk-base.css</a>';

    fetch('http://localhost:3000/header-markup.html')
      .then(response => response.text())
      .then(htmlCode => {
        console.log(htmlCode);
        this.headMarkupContainer.innerHTML = htmlCode;
      });
  }

  getComparisonData(repo) {
    const githubToken = '77fbbaaf1c494f5de405d2fa9baa82b0ec9df162';
    const packageJson = 'http://localhost:3000/root/package.json';
    let urls;
    let packagesArr = [];

    if (repo === 'govuk-elements-sass') {
      urls = [
        'https://api.github.com/repos/alphagov/govuk_elements/contents/packages/govuk-elements-sass/VERSION.txt',
        packageJson
      ];
    }

    if (repo === 'govuk_frontend_toolkit') {
      urls = [
        'https://api.github.com/repos/alphagov/govuk_frontend_toolkit/contents/VERSION.txt',
        packageJson
      ];
    }

    Promise.all(
      urls.map(url =>
        fetch(url, {
          headers: {
            Authorization: `token ${githubToken}`
          }
        }).then(resp => resp.json())
      )
    ).then(versionData => {
      const githubVersion = atob(versionData[0].content).trim();
      const localVersion = versionData[1].dependencies[repo]
        .replace(/^\^+/g, '')
        .trim();

      this.displayVersionResults(repo, githubVersion, localVersion);
    });
  }

  displayVersionResults(repo, githubVersion, localVersion) {
    // if (repo === 'govuk-elements-sass') {
    const node = document.createElement('LI');
    const result =
      githubVersion === localVersion
        ? `${repo} ✅  Up to date (Current verison is: ${githubVersion})`
        : `😢 Needs updating (Current verison is: ${githubVersion} and the local verison is: ${localVersion})`;
    const textnode = document.createTextNode(result);
    node.appendChild(textnode);
    this.npmPackagesContainer.appendChild(node);
  }
}

new compileSass();
