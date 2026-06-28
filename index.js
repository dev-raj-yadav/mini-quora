const express=require("express")
const path=require("path")
const app=express();
const port=8080;
const {v4:uuidv4}=require("uuid")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))


//databases
let posts=[
    {
        id:uuidv4(),
        username:"Dev Raj",
        title:"How do I learn Node.js",
        description:"I 'm a beginner and want a roadmap."
    },
    {
        id:uuidv4(),
        username:"Sneh Ranjan",
        title:"From where i can get resource for DSA in Python",
        description:"I 'm a begginer and want resources"

    }
]
//home page
app.get("/",(req,res)=>{
    res.render("home.ejs")
})


//posts page
app.get("/posts",(req,res)=>{
    res.render("posts.ejs",{posts});
})

//Form for adding Post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

//add post page
app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let{username,title,description}=req.body;
    posts.push({id,username,title,description});
    res.redirect("/posts");
})


app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})

