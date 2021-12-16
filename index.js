import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import TodoModel from './schemas/todo_schema.js'


dotenv.config();
const app = express();
app.use(express.json());
const db = process.env.DB_URL;  
const PORT = process.env.PORT || 3000;

mongoose.connect(db, {
    useUnifiedTopology: true}).then(()=>{
        console.log('Connected to MongoDB succesfully')}).catch((err)=>{
            console.log(err)})
//creat todo
app.get('/todos', async(req,res)=>{
    try {
        const todos = await TodoModel.find({});
        return res.status(200).json({
            status: true,
            message: 'Todo fetched succesfully',
            data:todos
        })
    } catch (error) {
        console.log('Something went wrong', error);
        res.setMaxListeners(400).send('Faild to fecth todos', error)
    }
})
//creat a Todo
app.post('/todos', async(req,res)=>{
    try {
        const newTodo = await TodoModel.create({...req.body})
        res.status(201).json({
            status: true,
            message: "Todo createdSuccessfully",
            data:newTodo
        })
    } catch (error) {
        console.log('Something went wrong', error);
       // res.status(400).send('Faild to fecth todos', error)
    }
})

//delete a todo
app.delete('/todos/:id', async(req,res)=>{
    try {
        const{id} = req.params;
        const deleteTodo = await TodoModel.findByIdAndDelete(id);
        return res.status(201).json({
            message: 'Todo deleted Successfully'
        })
    } catch (error) {
        console.log("Somthing went wrong", error);
    }
})
//  Update Todo
app.patch('/todos/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const {status}= req.body;
        const UpdateTodo = await TodoModel.updateOne({status:status}).where ({_id:id})
        return res.status(201).json({
            status:true,
            message: 'Todo updated successfully',
            data: UpdateTodo
        })
        
    } catch (error) { console.log('Something went wrong', error)
        
    }
})

            app.listen(PORT)