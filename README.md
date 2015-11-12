# pipeline
Contact management tool for early stage investors



BEN'S NOTES:
* use this for addEntry... city, state: https://github.com/vskosp/vsGoogleAutocomplete


TO DO HERE:
* how to install and start server
* clean up directory layout
* setup API route chart
* add details of firebase
* discuss tech stack

Installing Firebase & AngularFire
* In terminal:
  * `bower install firebase --save`
  * `bowert install angularfire --save`
* Add script dependencies:
  * `<script src="https://cdn.firebase.com/js/client/2.3.1/firebase.js"></script>`
  * `<script src="https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js"></script>`
* Inject AngularFire services:
  * `var app = angular.module('pipeline', ['firebase']);`



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
