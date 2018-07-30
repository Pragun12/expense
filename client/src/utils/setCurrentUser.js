import jwt from "jsonwebtoken";

const state={
    isLoggedIn:false,
    currentUser:{}
}

export default function setCurrentUser(token){
   
   let user=jwt.decode(token);
   if(user){
       return {
           isLoggedIn:true,
           currentUser:user
       }
   }
   else{
       return state;
   }

};