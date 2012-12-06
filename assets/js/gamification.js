var DirectSuper = DirectSuper || {};
 
var DirectSuperLearning = function ($scope, $http) {
    
    $scope.currentStatus = "unknown";

    $scope.fetch = function () {
        console.log("no yam");

        // all messages
        function parseAllMessages(response){
 
            var groupedMessages = _.map(response,function(msg){
                return {sender_name: msg.full_name, messages:msg.stats.updates };
            });
            var sortMessages= _.sortBy(groupedMessages, function(person){
                return person.messages * -1; // to reverse the order
            });
            return sortMessages;
        }

        yam.request(
            {
                url:'https://www.yammer.com/api/v1/users.json?sort_by=messages',
                dataType:'json',
                method:'GET',
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }   ,
                success:   function (response) {
                    console.log("success");
                    $scope.allMessages = parseAllMessages(response);
                    $scope.$apply();
                },
                error:  function (error) {
                    console.log("error:" ,error);
                    $scope.error = error;
                    $scope.$apply();
                }
            });
    };


};
var directSuperTrainingApp = angular.module('directSuperTrainingApp', []);
directSuperTrainingApp.controller('DirectSuperLearning', DirectSuperLearning);