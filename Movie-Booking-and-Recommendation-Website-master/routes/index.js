const express=require("express"),
	  router=express.Router(),
	  mongoose=require("mongoose"),
	  movies=require("../models/movies");



//=====================================LANDING PAGE==================================================
router.get("/",function(req,res)
	{
		res.render("landing");
		
	});
router.get("/index",function(req,res)
{
	movies.find({},function(err,allmovies)
		{
			if(err)
				console.log(err);
			else
				res.render("home",{movies:allmovies});
		})
});

//==============Search ===============
router.get("/search",function(req,res)
	{
	
	movies.find({name: ""},function(err,movies)
		{
			if(err)
			{  
 				console.log(err);
 				req.flash("Movie Dosen't Exist");
 				res.redirect("/index");
			}
			else
				res.render("search",{movies:movies});
		});
		
	});

router.post("/search",function(req,res)
{
	var query = req.body.name;
	


		movies.find().or([{ name: query }, { theatre: query }, { date: query }])
    .then(movies => { 
		req.flash("Movie Dosen't Exist");
		res.render("search",{movies:movies});
	})
    .catch(error => { 
		console.log(error);
 				req.flash("Movie Dosen't Exist");
 				res.redirect("/index");
	 })
		


	});
	

//=========================  more info about a movie =================================
	router.get("/home/:id",function(req,res)
	{
		movies.findById(req.params.id,function(err,movie)
		{
			console.log(movie);

			if(err)
			{  
 				console.log(err);
 				req.flash("Movie Dosen't Exist");
 				res.redirect("/movie");
			}
			else
				res.render("movie",{movie:movie});
		});

		
	});

	module.exports=router;