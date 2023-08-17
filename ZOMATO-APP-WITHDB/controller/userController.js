const UserModel = require("../model/UserModel");

const userController ={
    userHome : (request,Response) =>{
        Response.send({
           status:true,
           message:"welcome to Home" 
        });
    },
    getUserlist : async (request, response) => {
        let { gender } =request.params;
       let result = await UserModel.find(
        { gender: { $regex: gender, $options: "i" } },
        {first_name:1,last_name:1,email:1, _id:0}); 
        response.send({
         status:true,
         list : result,
    });
    },
    saveUserData :async (request, response) => {
       //client (postman) to server 

       let user = request.body;

      let saveData = {

        f_name : user.f_name,
        l_name : user.l_name,
        gender : user.gender,
        email  : user.email,
        mobile : user.mobile,
       password:user.password,
    
    };
    let newUser = new UserModel(saveData);
    let result = await newUser.save(); /// insert data in     response.send({
        response.send({
            call: true,
            result,
          });
},

UserLogin : async (request,response )=>{
    let { email , password } = request.body;
   let isUservalid = await UserModel.findOne(
    {
        email:email,
        password :password,
    },
      { password: 0 }
        );
      if (isUservalid) {
        response.send({
            call: true,
            user: isUservalid,
        });
       }else{
         response.send({
          call:false,
        });
       }
},

};

module.exports = userController;