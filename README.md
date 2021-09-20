# gym-buddies

Welcome to the Gym, Buddy ;)

Let's turn the heat up by using <a href="firebase.com" target="_blank">Firebase</a> to start saving out our data and building a dynamic persistant chatting platform. 

Users should be able to share their workouts, recipies, and other bodybuilding tips for reaching health goals (AKA Get Awesome). Users should also be able to connect with each other through the global chatting program (Get Info)

The tasks ahead might get a bit tricky stick with it and take things on one at a time.

###Step 1 - Routing

You will notice if you take a look at the routes in `app/config/routes.js` that we are using ui-router and nested routes. The first couple routes have been setup for you.  You will need to setup the other two routes You will want to continue to keep them nested.

```javascript
.state('auth.chat'. {...})
.state('auth.share'. {...})
```

Notice after you get these other two routes setup keeping them nested under the `auth` route will ensure that the top navbar is in place for all its sub routes. 

###Step 2 - Firebase and Angularfire

This project is not using `angularfire` yet. So go ahead and get that setup. 

Next take a look at `app/config/constants` you will see an angular constant `FBREF` this is our connection string to our database. If you look at the `auth-component` you can see how we can pass (aka inject) this constant and use it in our other controllers. 

This practice allows us to quickly switch databases without having to update all of our controllers individually.

You will need to use the `FBREF` constant when setting up the chatting and sharing platforms. 

###Step 3 - Getting Awesome

Getting Awesome is our sharing platform where users can post pictures or text snippets of things that make themselves look awesome.

Think here of a todolist. We are asking for a simple form that will send its content as a post to a general channel at the subroot of `posts`

```javascript
FBREF + 'posts'
```

The bare requirements should be a form with at least a few inputs. Use the following object properties.

```html
<form>
	<input ng-model="$ctrl.newPost.title" />
	<input ng-model="$ctrl.newPost.body" />
	<input ng-model="$ctrl.newPost.imgUrl" />
</form>
```
which becomes 

```javascript
{
	title: string,
	body: string,
	imgUrl: string
}
``` 
Once you start posting content to the posts make sure you have an `ng-repeat` somewhere so you can see posts from yourself and other users.


###Step 4 - Getting Info

A simple chat platform. This should just be a general chatroom where you can send messages to any of the users that are registered at the gym. Use the following endpoint

```javascript
FBREF + 'chats'
```

Theoretically this should be a bit easier to pull off than the posts from above. Try adding a few extra things to a message like a `timestamp` and the `author` of the chat This you will need to pull off of the `auth-component` Can you think of some ways you might accomplish this?


## Legal Overview

The content under the CodeWorks®, LLC Organization and all of the individual repos are soley intended for use by CodeWorks Instruction to deliver Educational content to CodeWorks Students.

---

## Copyright

© CodeWorks® LLC, 2021. Unauthorized use and/or duplication of this material without express and written permission from CodeWorks, LLC is strictly prohibited.


<img src="https://bcw.blob.core.windows.net/public/img/7815839041305055" width="125">
