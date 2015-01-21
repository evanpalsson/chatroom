var app = angular.module('chatroom');

app.controller('mainCtrl', function($scope, parseService){

  $scope.getParseData = function(){   //<-- just a name for the function that gets invoked at the very bottom
    parseService.getData()            //<-- this invokes the getData function in the service
      .then(function(data){           //<-- this is the object being taken in
        $scope.messages = data.data.results;  //<-- this is the object followed by the key and then the property.
    })
  };

  $scope.showNewMessage = true; //<-- 
  $scope.showFilterMessage = true; //<-- don't see any reason to have this.

  $scope.showFilterMessage = function(){
    // $scope.showNewMessage = false; //<-- don't see any reason to have this.
    $scope.showFilterMessage = true;
  }

  // $scope.showNew = function(){         //<-- this doesn't do anything.
  //   $scope.showNewMessage = true;
  //   $scope.showFilterMessage = false;
  // }


  $scope.postData = function(){
    var postMessage = {};                 //<-- this creates a jar that gets filled with an object.
    postMessage.text = $scope.message;    //<-- the message is coming from the HTML and being passed 
                                          //into the jar with a property called 'text' being created.
    parseService.postData(postMessage);   //<-- the jar is passed to the postData function in the service
    $scope.message = '';
    parseService.postData($scope.message)
  };
  $scope.getParseData();                  //<-- invoking the getParseData function up above so when a message
                                          //gets sent to the database, it updates on the HTML page






  //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.

  //The getParseData function will call the getData method on the parseService object. You'll then save the result 
  //of that request to your controllers $scope as messages ($scope.messages)



  //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model 
  //correlates to on the input box), pass that text to the postData method on the parseService object which will 
  //then post it to the parse backend.




  //uncomment this code when your getParseData function is finished
  //This goes and gets new data every second, which mimicking a chat room experience.

  setInterval(function(){
    $scope.getParseData();
  }, 1500)
})
