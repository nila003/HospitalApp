const express = require('express')
const router=express.Router()

const fs = require('fs')

const loadHosp = () =>{
    try{
        const dataBuffer = fs.readFileSync('hosp_data.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    }catch(error){
        console.log(error)
        return[]
    }
}

const savehosp = (hosp_data)=>{

    try{
        const dataJSON = JSON.stringify(hosp_data,null,2)
        fs.writeFileSync('hosp_data.json',dataJSON)
    }catch(error){
        console.log(error)
    }
    

}
router.get('/',(req,res)=>{
    const hosp_data = loadHosp()
    res.send(hosp_data)

})

router.post('/',(req,res)=>{
    const hosp_data = loadHosp()
try{
    const newHosp_data ={
    id:hosp_data.length +1,
    hospName:req.body.hospName,
    patientCount:req.body.patientCount,
    hospLoc:req.body.hospLoc
}

    hosp_data.push(newHosp_data)
    savehosp(hosp_data)
    res.status(201).send(newHosp_data)
}catch(error){
    res.status(400).send({error})
}

})

router.put('/:id',(req,res)=>{
    try{
        const hosp_data = loadHosp()
        const hosp = hosp_data.find(i=>i.id === parseInt(req.params.id))
        if(hosp === -1){
            return res.status(404).send({error:'Data not found'})
        }
        hosp_data[hosp]= {
            id: parseInt(req.params.id) ,   
            hospName :req.body.hospName,
            patientCount :req.body.patientCount, 
            hospLoc : req.body.hospLoc 
        };
        savehosp(hosp_data)
        res.send({message:'Data record updated'})

    }catch(error){
        res.status(400).send({error})
    }

})

router.delete('/:id',(req,res)=>{
    try{
        let hosp_data = loadHosp()
        const index = hosp_data.findIndex(i=>i.id===parseInt(req.params.id))
        if(index === -1){
            return res.status(404).send({error:'Data record not found'})
        }

        hosp_data.splice(index,1)
        savehosp(hosp_data)
        res.send({message:'Data record deleted'})

    }catch(error){
        res.status(400).send({error})
    }
})
    
module.exports = router;