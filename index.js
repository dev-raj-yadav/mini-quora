const express=require("express")
const path=require("path")
const app=express();
const port=8080;
const {v4:uuidv4}=require("uuid")
const methodOverride=require("method-override")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));


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

//show post individually
app.get("/posts/:id",(req,res)=>{
let {id}=req.params;
let post=posts.find((p)=>id===p.id);
    res.render("show",{post})
})

//form for updating the exisitng posts
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);

    res.render("edit",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    console.log(post)
    let newTitle=req.body.title;
    let newDescription=req.body.description;
    console.log(newTitle,newDescription);
    post.title=newTitle;
    post.description=newDescription;
   res.redirect("/posts");
   
})

//to delete posts
app.delete("/posts/:id",(req,res)=>{
let {id}=req.params;
posts=posts.filter((p)=> id!==p.id);
res.redirect("/posts");


})



app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})

