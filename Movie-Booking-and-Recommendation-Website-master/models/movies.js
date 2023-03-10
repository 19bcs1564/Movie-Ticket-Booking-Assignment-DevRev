
var mongoose=require("mongoose");
var movieSchema=new mongoose.Schema(
{
	name: String,
	img: String,
	ratings: String,
	director: String,
	summary: String,
	release: Number,
	duration: Number,
	date: String,
	theatre:String,
	screening: {
		type: Number,
		default: 0
	}
	
});


module.exports=mongoose.model("movies",movieSchema);