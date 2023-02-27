const express = require('express');
const app = express();
const port = 7171;
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const datas = require('./data.json');

//Read data
app.get('/hospital', (req, res) => {
    console.log("Data is read")
  res.send(datas);
});

// Add data
app.post('/hospital',(req, res) =>{
    datas.push(req.body);
    fs.writeFile('data.json',JSON.stringify(datas),(err,resp)=>{
        if(err){
            res.send("Hospital data cannot be added")
        }
        else{
            console.log("Data added")
            res.send(datas)
        }
    })
})
// update data

app.put('/hospital/:name',(req,res)=>{
    let name =req.params.name;
    let index=-1;
    datas.forEach((item)=>{
        if(item.Hospital_Name == name ){
             index = 1;
            item.Hospital_Name = req.body.Hospital_Name || item.Hospital_Name;
            item.Patient_Count = req.body.Patient_Count || item.Patient_Count 
            item.Hospital_Location = req.body.Hospital_Location ||  item.Hospital_Location 
        }
    })
    fs.writeFile('data.json',JSON.stringify(datas),(err,resp)=>{
        if(err){
            res.send("Hospital data cannot be updated");
        }
        if(index===-1){
            res.send(`hospital record of ${name} not found`)
        }
        else{
            console.log("Data updated");
            res.send(datas);
            
        }
    })
})

  
//delete data

app.delete('/hospital/:name',(req,res)=>{
    let name =req.params.name; 
      let clear =datas.filter(item=>item.Hospital_Name !==name)  ;    
    fs.writeFile('data.json',JSON.stringify(clear),(err,resp)=>{
        if(err){
            res.send("Hospital data was not deleted");
        } 
        if (clear.length === datas.length) {
           
            res.send(`No hospital with the name ${name}  found`);
            return;
          }     
        else{
            console.log("Hospital data deleted")
            res.send(clear);
        }
    })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});





