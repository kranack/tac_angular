'use strict';

angular.module('collabro.version', [
  'collabro.version.interpolate-filter',
  'collabro.version.version-directive'
])

.value('version', '0.1');
