var express = require('express');
var router = express.Router();
const userModel=require('./users');
const postModel=require('./posts');
const passport = require('passport');
const upload=require('./multer');

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));
//from above two lines user login

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/feed',isLoggedIn, function(req, res, next) {
  res.render('feed',);
});

router.post('/upload',upload.single('file'),async function(req, res) {
  if(!req.file){
    return res.status(404).send("no files were given");
  }
  const user=await userModel.findOne({
    username:req.session.passport.user
  });
  const post = await postModel.create({
    image:req.file.filename,
    imageText:req.body.filecaption,
    user:user._id
  });
   user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

router.get('/login', function(req, res, next) {
  res.render('login',{error:req.flash('error')});
});

router.get('/profile', isLoggedIn,async function(req, res, next) {
  const user=await userModel.findOne({
    username:req.session.passport.user
  }).populate("posts");
  res.render('profile',{user});
});

//register
router.post('/register',(req,res)=>{
  const userdata = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
  })
  userModel.register(userdata,req.body.password)
  .then(()=>{
    passport.authenticate("local")(req,res,()=>{
      res.redirect('/profile');
    })
  })
});

//login
router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:'/login',
  failureFlash:true
}),function(req,res){});

//logout
router.get('/logout',(req,res)=>{
  req.logout(function(err){
    if(err)return next(err);
    res.redirect('/');//after logout go to home route
  })
  });

  //isLoggedIn function
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated())return next();//if loggedin go ahead otherwise go to home route
    res.redirect('/login');
  }

// router.get('/alluserpost',async(req,res)=>{
// let user =  await userModel.findOne({_id:"65a39d0d82cd1496309c45b0"})
// .populate('posts');
// res.send(user);
// });

// router.get('/createuser', async function(req, res, next) {
//  let createduser =  await userModel.create({
//     username: "ankit",
//   password: "ankit",
//   posts: [],
//   fullname:"ankitkumar",
//   email: "ankit@gmail.com",
// })
// res.send(createduser);
// });

// router.get('/createpost', async function(req, res, next) {
//   let createdpost =  await postModel.create({
//     postText: "hello everyone1",
//     user:"65a39d0d82cd1496309c45b0"
//  });
//  let user1 = await userModel.findOne({_id:"65a39d0d82cd1496309c45b0"});
//  user1.posts.push(createdpost._id);
//  await user1.save();
//  res.send("done");
//  });
module.exports = router;
