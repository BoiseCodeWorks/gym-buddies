(function () {

	angular.module('gym-buddies.auth', [])
		.component('authComponent', {
			templateUrl: 'app/components/auth/auth.html',
			controller: AuthController
		})

	function AuthController($scope, FBREF) {
		var ac = this;
		var db = new Firebase(FBREF);

		ac.$onInit = activate;

		function update(snapshot) {
			if (snapshot) {
				ac.member = snapshot.val();
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
			var member = {
                username: ac.auth.username,
                email: ac.auth.email,
                id: authData.uid
            }
			db.child('users').child(authData.uid).set(member)
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