import app from "./src/app";

const PORT=3888;

app.listen(PORT,()=>{
    console.log("Server is listening on port:",PORT);
})

process.on("SIGINT",(signal:NodeJS.Signals)=>{
    console.log("Shutdown the server");
    process.exit(1);
});

