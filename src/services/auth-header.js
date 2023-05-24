export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.accessToken){
        return {
            Authrization: 'Bearer '+ user.accessToken
        };
    }else{
        return{};
    }
}