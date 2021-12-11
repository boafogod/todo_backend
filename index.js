import express from 'express';
import mongoose from 'mongoose';
import TodoModel from './schemas/todo_schema.js'


const app = express();

mongoose.connect('mongodb+srv://boafogod1:pu66y419god@cluster0.9oedz.mongodb.net/myTask?retryWrites=true&w=majority', {
    useUnifiedTopology: true}).then(()=>{
        console.log('Connected to MongoDB succesfully')}).catch((err)=>{
            console.log(err)})
//creat todo
app.get('/todo', async(req,res)=>{
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

            app.listen(3000)