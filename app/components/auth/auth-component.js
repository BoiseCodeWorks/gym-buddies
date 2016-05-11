(function () {

	angular.module('gym-buddies.auth', [])
		.component('authComponent', {
			templateUrl: 'app/components/auth/auth.html',
			controller: AuthController
		})
        .service('MemberService', function(){
            var as = this;
            var _member = {}; //Pointer dfghujiko6y7u832
            
            as.setMember = function(member){
                // _member = member // pointer 3e4u8i90kofcghvjbskadf
                for(var propName in member){
                    _member[k] = member[k]
                }
            }
            
            var member = {
                username: 'Jake overall'
            }
            
            as.getMember = function(){
                return _member //Pointer dfghujiko6y7u832
            }
            
        })

	function AuthController($scope, FBREF, MemberService) {
		var ac = this;
		var db = new Firebase(FBREF);

		ac.$onInit = activate;

		function update(snapshot) {
			if (snapshot) {
				ac.member = snapshot.val(); // pointer 3e4u8i90kofcghvjbskadf
                MemberService.setMember(ac.member);
			}
			$scope.$evalAsync(function () {
				ac = ac;
			})
		}

		function activate() {
			getAuth();
		}

		ac.login = function () {
			clearError()
			db.authWithPassword(ac.auth).catch(handleError).then(getAuth)
		}

		ac.register = function () {
			clearError()
			db.createUser(ac.auth).catch(handleError).then(registerMember)
		}


		function getAuth() {
			var authData = db.getAuth()
			if (authData) {
				ac.userRef = db.child('users').child(authData.uid);
				ac.userRef.on('value', update)
				closeModal()
			} else {
				//show modal
				showModal()
			}
		}
		
		function showModal(){
			ac.activeView = 'login'
			update()
		}
		
		function closeModal(){
			ac.activeView = ''
			update()
		}

		function registerMember(authData) {
			if (authData.error) {
				return authData.error;
			}
			ac.auth.authData = authData;
            delete ac.auth.password;
			db.child('users').child(authData.uid).set(ac.auth)
			ac.login()
		}

		function handleError(err) {
			ac.err = err.message
			return err;
		}

		function clearError() {
			ac.error = null;
		}

		ac.logout = function () {
			ac.userRef.off('value', update);
			ac.member = null;
			db.unauth();
		}

	}
} ())