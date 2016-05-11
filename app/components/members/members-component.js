(function(){
	
	angular.module('gym-buddies')
		.component('membersComponent', {
			templateUrl: 'app/components/members/members.html',
			controller: MembersController
		})
	
	
		function MembersController(MemberService){
	    	var mc = this;
            
            mc.$onInit = getMember
            
            
            function getMember(){
                mc.member = MemberService.getMember()
            }
            	
		}
	
	
}())