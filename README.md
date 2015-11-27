# pipeline
Contact management tool for angel investors, venture capitalists, and early stage investors.

Designed, architected, and developed by [Ryan](https://github.com/oggimusprime "Ryan Haase") and [Benjamin](https://github.com/benjaminhoffman "Benjamin Hoffman")



TO DO HERE:
* any details of firebase
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
│   ├   ├── fullContactFactory.js
│   ├   ├── phoneFilter.js
│   ├   ├── profileFactory.js
│   └── dashboard
│   ├   ├── dashboard.html
│   ├   ├── dashboard.js
│   └── env
│   ├   ├── config.js
│   └── footer
│   ├   ├── footer.html
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
├── pipeline8-export_nov27
└── README.md
```

Firebase Data Structure:

```
"founder" : {
  "-K46Np9acFe-4UWSGJp0" : {
    "date" : "2015-11-27T05:20:03.509Z",
    "email" : "bastien@postmates.com",
    "lastContact" : "2015-11-27T05:20:03.509Z",
    "name" : "Bastian Lehmann",
    "notes" : {
      "-K46VJQ9NIyS-sjAjbIP" : true
    },
    "startup" : "Postmates"
  },
  "-K46P9wgKRnSZTUI15dn" : {
    "date" : "2015-11-27T05:23:39.783Z",
    "email" : "leah@taskrabbit.com",
    "lastContact" : "2015-11-27T05:52:23.666Z",
    "name" : "Leah Busque",
    "notes" : {
      "-K46V8WQnQ3Y5ZJ_X2rw" : true
    },
    "startup" : "TaskRabbit"
  }
},
"notes" : {
  "-K46TkcDa4oXAj9eX68j" : {
    "date" : "2015-11-26T05:46:12.966Z",
    "note" : "Met w/ founder.  Really nice guy.  Will sched follow up call later this month",
    "startup" : "TaskRabbit",
    "startupId" : "-K46P9w2sUZQ7-vqqpLi",
    "status" : "No status"
  },
  "-K46TsSlShC0E7PO-4RB" : {
    "date" : "2015-11-24T05:47:19.947Z",
    "note" : "Schedule follow up call",
    "startup" : "Thumbtack",
    "startupId" : "-K46RgAMjpdnBdD2ZhJX",
    "status" : "Past due"
  }
},
"startup" : {
  "-K46Np9B4_R_3U6UMIYH" : {
    "date" : "2015-11-21T05:20:03.509Z",
    "founders" : {
      "-K46Np9acFe-4UWSGJp0" : true
    },
    "industry" : "On-Demand",
    "lastContact" : "2015-11-27T05:48:13.007Z",
    "location" : "San Francisco, CA, USA",
    "name" : "Postmates",
    "notes" : {
      "-K46UGnviCIPTijJ2ryT" : true
    },
    "partner" : "Ben",
    "pipeline" : "2. Spoke with Team",
    "source" : "Spark",
    "tagline" : "On-demand delivery from every restaurant and store in your city.",
    "website" : "https://postmates.com/"
  },
  "-K46P9w2sUZQ7-vqqpLi" : {
    "date" : "2015-11-26T05:23:39.783Z",
    "founders" : {
      "-K46P9wgKRnSZTUI15dn" : true
    },
    "industry" : "On-Demand",
    "lastContact" : "2015-11-26T05:46:12.966Z",
    "location" : "San Francisco, CA, USA",
    "name" : "TaskRabbit",
    "notes" : {
      "-K46TkcDa4oXAj9eX68j" : true
    },
    "partner" : "Ryan",
    "pipeline" : "4. Due Diligence",
    "source" : "Lightspeed",
    "tagline" : "Live smarter by outsourcing household errands and skilled tasks to trusted people in your community.",
    "website" : "https://www.taskrabbit.com/"
  }
}
```

