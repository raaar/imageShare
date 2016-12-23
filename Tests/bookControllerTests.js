var should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests:', function(){
  describe('Post' , function() {
    it('Should not allow empty title on post', function() {
      var Book = function(book){
        this.save = function(){};
      };

      // mock book for test
      var req = {
        body: {
          author: 'Jon'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var bookController = require('../Controllers/bookController')(Book);

      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);

      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
