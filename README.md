# pipeline
Contact management tool for early stage investors



BEN'S NOTES:
* use this for addEntry... city, state: https://github.com/vskosp/vsGoogleAutocomplete


TO DO HERE:
* how to install and start server
* clean up directory layout (below)
* setup API route chart
* add details of firebase
* discuss tech stack
* link to any blog post
* screenshots of product
* screenshots of mockups


database stores dates as ISOStrings in UTC time

Getting Startup
* Fork the repo, in terminal:
  * type `git clone <forked url>`
  * type `cd <directory>`
  * type `bower install`
  * type `npm install http-server -g`
  * type `http-server`
* Head to your browser:
  * navigate to `http://localhost:8080/app/#/dashboard`


# Directory Layout

```
.
├── app
│   └── about
│   ├   ├── about.html
│   ├   ├── about.js
│   └── addEntry
│   ├   ├── addEntry.html
│   ├   ├── addEntry.js
│   └── addEntry
│   ├   ├── addEntry.html
│   ├   ├── addEntry.js
│   └── assets
│   ├   ├── charts
│   ├   ├── logo_blank.svg
│   ├   ├── venture-route-logo-small.png
│   └── auth
│   ├   ├── auth.js
│   └── bower_components
│   └── common
│   ├   ├── addNoteFactory.js
│   ├   ├── angelListFactory.js
│   ├   ├── dashboardFactory.js
│   ├   ├── profileFactory.js
│   └── dashboard
│   ├   ├── dashboard.html
│   ├   ├── dashboard.js
│   └── env
│   ├   ├── config.js
│   └── home
│   ├   ├── home.html
│   ├   ├── home.js
│   └── nav
│   ├   ├── nav.html
│   ├   ├── nav.js
│   └── note
│   ├   ├── addNote.html
│   ├   ├── addNote.js
│   └── profileFounder
│   ├   ├── profileFounder.html
│   ├   ├── profileFounder.js
│   └── profileStartup
│   ├   ├── profileStartup.html
│   ├   ├── profileStartup.js
│   └── styles
│   ├   ├── main.css
│   ├── app.js
│   ├── index.html
├── documentation
├── test
├── .bowerrc
├── .gitignore
├── bower.json
├── npm-debug.log
└── README.md
```

Firebase Data Structure:

```
  {
    "startups": {
      "unique_id": {
        "name": "startup's name",
        "date": "date_as_ISOstring",
        "lastContact": "date_as_ISOstring",
        "founders": {
          "unique_id": true,
          "unique_id": true
        },
        "notes": {
          "unique_id": true,
          "unique_id": true
        },
        ...
      }
    },
    "founders": {
      "unique_id": {
        "name": "founder's name",
        "date": "date_as_ISOstring",
        "lastContact": "date_as_ISOstring",
        "startups": {
          "unique_id": true,
          "unique_id": true
        },
        "notes": {
          "unique_id": true,
          "unique_id": true
        },
        ...
      }
    },
    "notes": {
      "unique_id": {
        "note": "string",
        "date": "date_as_ISOstring",
        "startupId": true,
        "founderId": true
       },
        ...
    }
  }
```

