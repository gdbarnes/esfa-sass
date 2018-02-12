'use strict';

class compileSass {
  constructor() {
    this.compileButton = document.querySelector('.js-compile-sass');
    this.compilationSuccessful = document.querySelector(
      '.js-compile-successful'
    );
    this.npmPackagesContainer = document.querySelector('.js-npm-packages');
    this.headMarkupContainer = document.querySelector('.js-head-markup');

    this.packageJson = '/root/package.json';
    this.prodEnv = false;
    this.cdnUrl = this.prodEnv
      ? 'https://esfa-sass.herokuapp.com'
      : 'http://localhost:7070';
    this.cdnStylesPath = '/assets/stylesheets/';
    this.versionDetails = {};

    this.sendToGulp = this.sendToGulp.bind(this);
    this.successfulCompile = this.successfulCompile.bind(this);
    this.getComparisonData = this.getComparisonData.bind(this);
    this.displayVersionResults = this.displayVersionResults.bind(this);

    this.getComparisonData('govuk-elements-sass');
    this.getComparisonData('govuk_frontend_toolkit');
    this.getComparisonData('govuk_template_jinja');

    this.addEventListeners();
  }

  addEventListeners() {
    this.compileButton.addEventListener('click', this.sendToGulp);
  }

  sendToGulp() {
    console.log('Sending...');
    fetch('/send', {
      method: 'POST'
    })
      .then(response => console.log(response))
      .catch(error => console.error('Error: ', error))
      .then(response => this.successfulCompile());
  }

  successfulCompile() {
    const successMessage = `CSS compiled to: <a href="${this.cdnUrl}${
      this.cdnStylesPath
    }">${this.cdnUrl}${this.cdnStylesPath}</a> 🎉`;
    console.log(
      `%c CSS compiled to: ${this.cdnUrl}${this.cdnStylesPath} 🎉`,
      'color: forestgreen; font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; font-weight: bold; font-size: 20px;'
    );
    this.compilationSuccessful.innerHTML = successMessage;
    this.showHeadSectionCode();
  }

  showHeadSectionCode() {
    const data = {
      cdnUrl: this.cdnUrl,
      paths: {
        styles: this.cdnStylesPath,
        scripts: '/assets/javascripts/',
        images: '/assets/images/'
      },
      stylesheets: {
        base: 'esfa-govuk-base.css',
        ie6: 'esfa-govuk-ie6.css',
        ie7: 'esfa-govuk-ie7.css',
        ie8: 'esfa-govuk-ie8.css'
      },
      templateVersion: this.versionDetails['govuk_template_jinja'],
      elementsVersion: this.versionDetails['govuk-elements-sass']
    };

    // prettier-ignore
    hyperHTML.bind(document.getElementById('js-esfa-head-section'))`
<pre><code class="language-markup js-head-markup">&lt;!DOCTYPE html>
&lt;!--[if lt IE 9]>&lt;html class="lte-ie8" lang="en">&lt;![endif]-->
&lt;!--[if gt IE 8]>&lt;!-->&lt;html lang="en">&lt;!--&lt;![endif]-->
  &lt;head>
    &lt;meta charset="utf-8" />
    &lt;title>ESFA&lt;/title>

    &lt;!-- TEMPLATE STYLES - START -->
    &lt;!--[if gt IE 8]>&lt;!-->&lt;link rel="stylesheet" media="screen" href="{data.cdnUrl}${data.paths.styles}govuk-template.css?${data.templateVersion}"/>&lt;!--&lt;![endif]-->
    &lt;!--[if IE 6]>&lt;link rel="stylesheet" media="screen" href="{data.cdnUrl}${data.paths.styles}govuk-template-ie6.css?${data.templateVersion}"/>&lt;![endif]-->
    &lt;!--[if IE 7]>&lt;link rel="stylesheet" media="screen" href="{data.cdnUrl}${data.paths.styles}govuk-template-ie7.css?${data.templateVersion}"/>&lt;![endif]-->
    &lt;!--[if IE 8]>&lt;link rel="stylesheet" media="screen" href="{data.cdnUrl}${data.paths.styles}govuk-template-ie8.css?${data.templateVersion}"/>&lt;![endif]-->
    &lt;link rel="stylesheet" media="print" href="${data.cdnUrl}${data.paths.styles}govuk-template-print.css?${data.templateVersion}"/>
    &lt;!--[if IE 8]>&lt;link rel="stylesheet" media="all" href="${data.cdnUrl}${data.paths.styles}fonts-ie8.css?${data.templateVersion}"/>&lt;![endif]-->
    &lt;!--[if gte IE 9]>&lt;!-->&lt;link rel="stylesheet" media="all" href="${data.cdnUrl}${data.paths.styles}fonts.css?${data.templateVersion}"/>&lt;!--&lt;![endif]-->
    &lt;!-- TEMPLATE STYLES - END -->

    &lt;!--[if lt IE 9]>&lt;script src="${data.cdnUrl}${data.paths.scripts}ie.js?${data.templateVersion}">&lt;/script>&lt;![endif]-->

    &lt;link rel="shortcut icon" href="${data.cdnUrl}${data.paths.images}favicon.ico" type="image/x-icon" />
    
    &lt;link rel="mask-icon" href="${data.cdnUrl}${data.paths.images}gov.uk_logotype_crown.svg" color="#0b0c0c">
    &lt;link rel="apple-touch-icon" sizes="180x180" href="${data.cdnUrl}${data.paths.images}apple-touch-icon-180x180.png">
    &lt;link rel="apple-touch-icon" sizes="167x167" href="${data.cdnUrl}${data.paths.images}apple-touch-icon-167x167.png">
    &lt;link rel="apple-touch-icon" sizes="152x152" href="${data.cdnUrl}${data.paths.images}apple-touch-icon-152x152.png">
    &lt;link rel="apple-touch-icon" href="${data.cdnUrl}${data.paths.images}apple-touch-icon.png">

    &lt;meta name="theme-color" content="#0b0c0c" />
    &lt;meta name="viewport" content="width=device-width, initial-scale=1">
    &lt;meta property="og:image" content="${data.cdnUrl}${data.paths.images}opengraph-image.png">

    &lt;!-- ELEMENTS AND TOOLKIT STYLES - START -->
    &lt;!--[if gt IE 8]>&lt;!-->&lt;link rel="stylesheet" media="screen" href="${data.cdnUrl}${data.paths.styles}${data.stylesheets.base}?${data.elementsVersion}"/>&lt;!--&lt;![endif]-->
    &lt;!--[if IE 6]>&lt;link rel="stylesheet" media="screen" href="${data.cdnUrl}${data.paths.styles}${data.stylesheets.ie6}?${data.elementsVersion}"/>&lt;![endif]-->
    &lt;!--[if IE 7]>&lt;link rel="stylesheet" media="screen" href="${data.cdnUrl}${data.paths.styles}${data.stylesheets.ie7}?${data.elementsVersion}"/>&lt;![endif]-->
    &lt;!--[if IE 8]>&lt;link rel="stylesheet" media="screen" href="${data.cdnUrl}${data.paths.styles}${data.stylesheets.ie8}?${data.elementsVersion}"/>&lt;![endif]-->
    &lt;!-- ELEMENTS AND TOOLKIT STYLES - END -->
  &lt;/head>

  &lt;body>
    &lt;script>document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');&lt;/script>

    &lt;!-- PAGE CONTENT GOES HERE -->

    &lt;script src="${data.cdnUrl}${data.paths.scripts}govuk-template.js?${data.templateVersion}">&lt;/script>
  &lt;/body>
&lt;/html>
</code></pre>
    `;

    Prism.highlightAll();
  }

  getComparisonData(repo) {
    let urls;
    let packagesArr = [];

    if (repo === 'govuk-elements-sass') {
      urls = [
        'https://api.github.com/repos/alphagov/govuk_elements/contents/packages/govuk-elements-sass/VERSION.txt',
        this.packageJson
      ];
    }

    if (repo === 'govuk_frontend_toolkit') {
      urls = [
        'https://api.github.com/repos/alphagov/govuk_frontend_toolkit/contents/VERSION.txt',
        this.packageJson
      ];
    }

    if (repo === 'govuk_template_jinja') {
      urls = [
        'https://api.github.com/repos/alphagov/govuk_template_jinja/contents/VERSION',
        this.packageJson
      ];
    }

    Promise.all(urls.map(url => fetch(url).then(resp => resp.json()))).then(
      versionData => {
        const githubVersion = atob(versionData[0].content).trim();
        const localVersion = versionData[1].dependencies[repo]
          .replace(/^\^+/g, '')
          .trim();

        this.displayVersionResults(repo, githubVersion, localVersion);
        this.versionDetails[repo] = localVersion;
      }
    );
  }

  displayVersionResults(repo, githubVersion, localVersion) {
    const listItem = document.createElement('LI');
    const npmLink = document.createElement('A');
    npmLink.setAttribute('href', 'https://www.npmjs.com/package/' + repo);
    npmLink.innerHTML = repo;
    const result =
      githubVersion === localVersion
        ? ` ✅  Up to date (Current verison is: ${githubVersion})`
        : ` ❌ Needs updating (Current verison is: ${githubVersion} and the local verison is: ${localVersion})`;
    const versionText = document.createTextNode(result);
    listItem.appendChild(npmLink);
    listItem.appendChild(versionText);
    this.npmPackagesContainer.appendChild(listItem);
    return localVersion;
  }
}

new compileSass();

{
  /* <a href="https://www.npmjs.com/package/${repo}">${repo}</a>; */
}
