1. data association
ek model se dusre model ke data ko jod dena eg :- In backend development, "data association" means linking different entities in a database. For example, in the data association between "User" and "Post," the "User ID" in the Post table is connected to the "User ID" in the User table as a foreign key.

---->roadmao<------
1. /route -> login and signup
2. /profile -> profile and saved posts dikhegi aur ek uploaded section hoga jo abhi nahi bna rhe hain
3. /feed -> yahan sari images dikhengi
4. /click -> image open ho jayegi
5. /board/:boardname -> poora board dikhega

for flash use these two lines in app.js

1. npm i connect-flash
2. const flash = require('connect-flash');
3. app.use(flash());--> above
 app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"ankitji"
}));

[
actually flash error is an array
if we directly go to /login then it blank array.

but if we type wrong password or username while login then it shows an array of 
length >0.
]

isLoggedin user info store krke rkhta h

--> jb user login ho jaye to /profile  pe uski information bhi show ho jo login ke bad passport pe store ho jata h
aise->

[
const user=await userModel.findOne({
    username:req.session.passport.user
  });
  res.render('profile',{user});
]

--> image upload krne ke bad use as a post database me save kro post ki id user ko do and user ki id post ko do