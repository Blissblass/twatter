# README

# Project: Social Media App

![Twatter home screen](https://i.imgur.com/imgi0e3.png)

Twatter is my first fullstack React app and also my student solution to App Academy's **Full Stack Project** course. My goal was to create a simple React/Rails app with User authentication features (using the Devise gem) along with Posting, Commenting, Following and Liking.

# Challenges

The first challenge I had to overcome when building this app was figuring out how to efficiently use fetch() calls to talk to the backend and parse the returned data to be used on the frontend, since I was pretty unfamiliar with the concept at that time. However, I was able to grasp the concept quickly after reading [some documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

Another challenge I faced after this was getting Devise to return JSON as a response. For some reason, even though the necessary headers were in place for the fetch call, Rails was still unable to detect that I was expecting JSON as a response, and thus Devise wasn't returning a JSON object as a result. After looking around a bit on Stack Overflow and reading some documentation, [this section on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#headers) fixed the problem.

I also found that getting an efficient solution to saving the currently signed in user was also a bit tougher than I expected. Normally, Devise creates a current_user variable that you can access anywhere in your Rails project, however, since this app used Rails in its API mode, current_user was unavailable. My first idea to solve this was to make a fetch call to get the user every time the page loads, but this was highly inefficient and would also lead to a lot of [prop drilling](https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it/), so after seeing how unmaintainable and inefficient this was, I instead decided to use a UserContext to store the signed in user.

```javascript
   <Router>
    <UserContext.Provider value={{currUser, setCurrUser}}>
      <Navibar />    
      <ErrorContext.Provider value={{errors, setErrors}}>
          <div className="container">
            <Switch>,
              <Route exact path="/home" render={(props) => <ProtectedRoute {...props} />} />
              <Route exact path="/login" render={(props) => <LoginRedirect {...props} />} />
              <Route exact path="/signUp" render={(props) => <SignupRedirect {...props} />} />
              <Route exact path="/user/:id" render={(props) => <ProfileRedirect {...props} />} />
              <Route exact path="/user/:id/follows" render={(props) => <UserFollows {...props} />} />         
              <Route exact path="/user/:id/followers" render={(props) => <UserFollowers {...props} />} />     
              <Route exact path="/post/:id" render={(props) => <PostPage {...props} />} />  
              <Route exact path="*" render={(props) => <NoMatch {...props} />} />
            </Switch>
            <Errors />
          </div>
      </ErrorContext.Provider>
     </UserContext.Provider>
   </Router>
```
*From here, we can then import UserContext and useContext to access the { currUser, setCurrUser } values saved in UserContext*

# Known Issues

* Going to a user's following/followers list, going back using the browsers navigation, and then refreshing occasionally crashes the app. I tried very hard to fix this but it seems to be an issue with React Router v5 rather than the code itself, as I haven't faced a similar issue in v6.

# To Do

* Adding the ability to change the media you upload with your "Tweet".
* Liking and unliking for comments, this could be implement very easily with a polymorphic association.
* Adding the ability to search for "Tweets".



 
