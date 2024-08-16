const Task = require("../models/taskModel.js");
const { createClient } = require("redis");

//redis connection
const client = createClient();

(async () => {
  await client.connect();
})();

client.on("connect", () => console.log("Redis Client Connected"));
client.on("error", (err) => console.log("Redis Client Error", err));

//api to create task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .send({ success: false, message: "Title and description is required" });
    }

    let doc = {
      title,
      description,
      userId: req.user.userId,
    };

    const newTask = await Task.create(doc);

    if (!newTask) {
      return res
        .status(400)
        .send({ success: false, message: "Unable to create task" });
    }
    
    //populate data from user collection
    await newTask.populate("userId", "_id username role");

    res.status(201).send({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } 
  catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

//api to get task with pagination and redis cache
exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    //get data from cache
    const cachedTask = await client.get(`get?$page=${page}&limit=${limit}`);

    if (cachedTask === null) {
      console.log('cache miss')

      const userId = req.user.userId;

      const [count, tasks] = await Promise.all([
        Task.countDocuments({ userId }),
        Task.find({ userId })
          .populate("userId", "username role")
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      //api response 
      const response = {
        totalTasks: count,
        totalPages: Math.ceil(count / limit),
        tasks,
      };

      //set data to cache
      client.set(`get?$page=${page}&limit=${limit}`, JSON.stringify(response));

      res.status(200).send({
        success: true,
        message: "Task fetched",
        data: response,
      });
    } 
    else {
      console.log("cache hit");
      res.status(200).send({ success: true, data: JSON.parse(cachedTask) });
    }
  } 
  catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

//api to update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, isCompleted } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(400)
        .send({ success: false, messgae: "Unable to update task" });
    }

    res
      .status(200)
      .send({ success: true, message: "Task updated", data: updatedTask });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

//api to delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res
      .status(200)
      .send({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
