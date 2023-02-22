
 const Message = require('../models/messageModel')
 const User = require('../models/userModel')
 const Chat = require('../models/chatModel')

 //send message


 const sendMessage = async (req,res) =>{
const {content, chatId} = req.body
if (!content || !chatId) {
  return res.status(400).send("invalid data passed into request")
}
var newMessage = {
  sender: req.user._id,
  content: content,
  chat: chatId

};

try {
  var message = await Message.create(newMessage);
  message = await Message.populate("sender" , "name pic");
  message = await Message.populate("chat");
  message = await User.populate(message,{
    path: "chat.users",
    select: "name pic email",
  }) 
  await Chat.findByIdAndUpdate(req.body.chatId, {
    latestMessage : message});
  res.json(message)


  
} catch (error) {
  res.status(400).send("error message")
  console.log(error)
}

 }


 //FETCH MESSAGE

const allMessages = async (req,res) => {
  try {
    const messages = await Message.find({chat: req.params.chatId}).populate(
      "sender", "name pic email")
      .populate("chat")
      res.json(messages)
    
    
  } catch (error) {
    res.status(400).send("error message")

    
  }

}




 module.exports={sendMessage, allMessages}