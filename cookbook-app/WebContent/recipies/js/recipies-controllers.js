
function apply($scope){
    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
        $scope.$apply();
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


app.controller('clientprofileListAppCtrl', function($scope,$timeout,$http,$resource,$window,config) {
    $scope.locale = Locale.FR;
    if ($window.location.href.indexOf("#/") != -1) {
        var langue = $window.location.href.substr($window.location.href.indexOf("#/") + 2, 2).toUpperCase();
        if(langue == 'EN'){
            $scope.locale = Locale.EN;
        }
    }
    $scope.libelles = libelles[$scope.locale]; 
    $scope.messages = messages[$scope.locale];
    $scope.config = config;

    var Client = $resource(config.restService + '/all');
    $scope.clientList = Client.query(function(data){
        //alert('success, got data: ', data);
    }, function(err){
        //alert('request failed'); 
    });
    
    $scope.deleteClient = function(index){
        var LoanAction = $resource(config.restService + '/delete/:id',{id:'@id'});
        LoanAction.get({id:index},function(){
            $window.location.reload();       
        });
    }
    
    
})
 
app.controller('clientprofileEditAppCtrl', function($scope,$timeout,$http,$resource,$window,$routeParams,config) {
    $scope.locale = Locale.FR;
    if ($window.location.href.indexOf("#/") != -1) {
        var langue = $window.location.href.substr($window.location.href.indexOf("#/") + 2, 2).toUpperCase();
        if(langue == 'EN'){
            $scope.locale = Locale.EN;
        }
    }
    $scope.libelles = libelles[$scope.locale]; 
    $scope.messages = messages[$scope.locale];
    $scope.config = config;

    var Client = $resource(config.restService + '/:id',{id:'@id'});
    $scope.client = Client.get({id:$routeParams.clientId},function(data){
        //alert('success, got data: ', data);
    }, function(err){
        //alert('request failed'); 
    });
    
    $scope.createClient = function(){
        var ClientUpdate = $resource(config.restService + '/create/:id/:firstName/:lastName/:email/:phoneNumber',{id:'@id',firstName:'@id',lastName:'@is',email:'@id',phoneNumber:'@id'});
        ClientUpdate.get({id:$scope.client.id,firstName:$scope.client.firstName,lastName:$scope.client.lastName,
        	email:$scope.client.email,phoneNumber:$scope.client.homePhoneNumber},function(data){
            //alert('success, got data: ', data);
                $window.location.reload();       
        }, function(err){
            //alert('request failed'); 
        });
    };

    $scope.updateClient = function(){
        var ClientUpdate = $resource(config.restService + '/update/:id/:firstName/:lastName/:email/:phoneNumber/:creditScore',{id:'@id',firstName:'@firstName',lastName:'@lastName',email:'@email',phoneNumber:'@phoneNumber',creditScore:'@creditScore'});
        ClientUpdate.get({id:$scope.client.id,firstName:$scope.client.firstName,lastName:$scope.client.lastName,
        	email:$scope.client.email,phoneNumber:$scope.client.homePhoneNumber,creditScore:$scope.client.creditScore},function(data){
            //alert('success, got data: ', data);
                $window.location.reload();       
        }, function(err){
            //alert('request failed'); 
        });
    }
    
    
    $scope.updateAddress = function(){
        var ClientUpdate = $resource(config.restService + '/updateAddress/:id/:street/:city/:state/:postalCode',{id:'@id',street:'@id',city:'@is',state:'@id',postalCode:'@id'});
        ClientUpdate.get({id:$scope.client.id,street:$scope.client.address.street,city:$scope.client.address.city,
        	state:$scope.client.address.state,postalCode:$scope.client.address.postalCode},function(data){
            //alert('success, got data: ', data);
                $window.location.reload();       
        }, function(err){
            //alert('request failed'); 
        });
    }
    
})


    
