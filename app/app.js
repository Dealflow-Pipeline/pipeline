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
      });
    $urlRouterProvider.otherwise('/dashboard');
  },
]);
