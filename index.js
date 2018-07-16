const Joi= require('joi');
const express=require('express');
const app=express();

app.use(express.json());

const cursos=[
    {id: 1, name:'curso1'},
    {id: 2, name:'curso2'},
    {id: 3, name:'curso3'},
];

app.get('/', (req, res)=>{
res.sendfile('index.html');
});

app.get('/api/cursos',(req,res)=>{
    res.send(cursos);
});

app.post('/api/cursos',(req,res)=>{
    const schema={
    name:Joi.string().min(3).required()
    };
    const result= Joi.validate(req.body, schema);


    if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
    }
    const curso={
     id: cursos.length + 1,
     name: req.body.name
    };
    cursos.push(curso);
    res.send(curso);
});

app.put('/api/cursos/:id',(req,res)=>{
    const curso=cursos.find(c=>c.id===parseInt(req.params.id));
    if(!curso)  return  res.status(404).send('El curso no fue encontrado');//400
        
    
    
    const schema={
        name:Joi.string().min(3).required()
        };
        const result= Joi.validate(req.body, schema);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
            }

    curso.name=req.body.name;
    res.send(curso);

    

});

app.delete('/api/cursos/:id',(req,res)=>{
    const curso=cursos.find(c=>c.id===parseInt(req.params.id));
    if(!curso)return res.status(404).send('El curso no fue encontrado');//400
    const index=cursos.indexOf(curso);
    cursos.splice(index,1);

    res.send(curso);

});

app.get('/api/cursos/:id',(req,res)=>{
    const curso=cursos.find(c=>c.id===parseInt(req.params.id));
    if(!curso)return res.status(404).send('El curso no fue encontrado');//400
    res.send(curso);
});

const port= process.env.PORT || 3000;
app.listen(port,()=>console.log(`Escuchando por puerto ${port}...`));