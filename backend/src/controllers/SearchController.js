const Dev = require("../models/Dev");
const ParseStringAsArray = require("../utils/parseStringAsArray"); 

module.exports = {
    async index(req,res){
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        const {latitude,longitude,techs} = req.query;
        const techsArray = ParseStringAsArray(techs);
        const devs = await Dev.find({
            techs: {
                $in:techsArray,
            },
            location:{
             $near:{
                $geometry:{
                    type:"Point",
                    coordinates:[longitude,latitude]
                },
                $maxDistance:10000
             }
            }
        });
        console.log(techsArray);
        return res.json({devs});
    }
}