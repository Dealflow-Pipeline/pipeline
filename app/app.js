var app = angular.module('pipeline', [
  'home',
  'about',
  'dashboard',
  'founder',
  'startup',
  'addEntry',
  'addNote',
  'nav',
  'profileFactory',
  'dashboardFactory',
  'addNoteFactory',
  'angelListFactory',
  'fullContactFactory',
  'privateKeysFactory',
  'phoneFilter',
  // 'auth',
  'ui.router',
  'ui.bootstrap',
  'firebase',
  'angularMoment',
  'vsGoogleAutocomplete',
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'homeCtrl',
      })
      .state('about', {
        url: '/about',
        templateUrl: 'about/about.html',
        controller: 'aboutCtrl',
      })
      .state('note', {
        url: '/note',
        templateUrl: 'note/addNote.html',
        controller: 'addNoteCtrl',
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: {
          loadStartupsTable: ['startupsTableFactory',
            function(startupsTableFactory) {
              return startupsTableFactory.getStartups();
            },
          ],
          loadFoundersTable: ['foundersTableFactory',
            function(foundersTableFactory) {
              return foundersTableFactory.getFounders();
            },
          ],
          loadNotesTable: ['notesTableFactory',
            function(notesTableFactory) {
              return notesTableFactory.getNotes();
            },
          ],
        },
      })
      .state('founder', {
        url: '/founder/:founderId/profile',
        templateUrl: 'profileFounder/profileFounder.html',
        controller: 'profileFounderCtrl',
        resolve: {
          founderProfile: ['$stateParams', 'founderProfileFactory',
            function($stateParams, founderProfileFactory) {
              return founderProfileFactory.getFounder($stateParams.founderId);
            },
          ],
        },
      })
      .state('startup', {
        url: '/startup/:startupId/profile',
        templateUrl: 'profileStartup/profileStartup.html',
        controller: 'profileStartupCtrl',
        resolve: {
          startupProfile: ['$stateParams', 'startupProfileFactory',
            function($stateParams, startupProfileFactory) {
              return startupProfileFactory.getStartup($stateParams.startupId);
            },
          ],
        },
      })
      .state('addEntry', {
        url: '/new',
        templateUrl: 'addEntry/addEntry.html',
        controller: 'addEntryCtrl',
      });

      //!!! we should combine these bc login & register will be the same page

      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'auth/login.html',
      //   controller: 'authCtrl',
      //   onEnter: ['$state', 'Auth', function($state, Auth) {
      //       Auth.currentUser().then(function() {
      //         $state.go('home');
      //       });
      //   }]
      // })
      // .state('register', {
      //   url: '/register',
      //   templateUrl: 'auth/register.html',
      //   controller: 'authCtrl',
      //   onEnter: ['$state', 'Auth', function($state, Auth) {
      //       Auth.currentUser().then(function() {
      //         $state.go('home');
      //       });
      //   }]
      // });
    $urlRouterProvider.otherwise('/dashboard');
  },
]);
