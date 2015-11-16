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
│   ├── app.js
│   ├── common
│   │   ├── controllers
│   │   ├── directives
│   │   ├── filters
│   │   └── services
│   ├── home
│   │   ├── controllers
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   ├── directives
│   │   │   └── directive1.js
│   │   ├── filters
│   │   │   ├── filter1.js
│   │   │   └── filter2.js
│   │   └── services
│   │       ├── service1.js
│   │       └── service2.js
│   └── about
│       ├── controllers
│       │   └── ThirdCtrl.js
│       ├── directives
│       │   ├── directive2.js
│       │   └── directive3.js
│       ├── filters
│       │   └── filter3.js
│       └── services
│           └── service3.js
├── partials
├── lib
└── test
```

Firebase Data Structure:

```
  {
    "startups": {
      "unique_id": {
        "startupName": "startup's name",
        "date": "date_as_a_string",
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
        "founderName": "founder's name",
        "date": "date_as_a_string",
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
        "note": "text",
        "date": "date_as_a_string",
        "startups": {
          "unique_id": true,
          "unique_id": true
        },
        "founders": {
           "unique_id": true,
           "unique_id": true
        },
        ...
      }
    }
  }
```

