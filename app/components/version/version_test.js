'use strict';

describe('collabro.version module', function() {
  beforeEach(module('collabro.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
