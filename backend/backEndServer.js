const express = require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(253,()=>{
    console.log("listioning port 253.....")
})
