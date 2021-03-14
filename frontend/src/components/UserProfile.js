var UserProfile = (function() {
    var user_name = "";
    var user_id = "";
  
    var getName = function() {
      return user_name;    
    };
  
    var setName = function(name) {
      user_name = name;     
      
    };

    var getId = function() {
        return user_id;    
    };
    
      var setId = function(id) {
        user_id = id;    
    };
  
  
    return {
      getName: getName,
      setName: setName,
      getId: getId,
      setId: setId
    }
  
  })();
  
  export default UserProfile;