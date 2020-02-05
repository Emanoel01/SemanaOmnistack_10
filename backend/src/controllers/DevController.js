const axios = require("axios");
const Dev = require("../models/Dev"); 
const ParseStringAsArray = require("../utils/parseStringAsArray"); 
 
 module.exports = {

    async index(req,res){
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        const devs = await Dev.find();

        return res .json(devs);
    },

    async store(req,res){
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

        const {github_username , techs, latitude, longitude} = req.body;
        
        let dev = await Dev.findOne({github_username});

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
        const {name = login, bio =`Esse é o ${login}`, avatar_url} = response.data;
    
        const techsArray = ParseStringAsArray(techs);
    
        const location = {
            type:"Point",
            coordinates:[longitude,latitude]
        };
    
        dev = await Dev.create({
            github_username,
            name,
            bio,
            avatar_url,
            techs:techsArray,
            location
        });
    
        return res.json(dev);
        }

    }
}