export default {
    login : user =>{
        console.log(user);
        return fetch('/login',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated : false, user : {email : ""}};
        })
    },

    register : user =>{
        console.log(user);
        return fetch('/api/v1/sellers/',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },



    register : buyer =>{
        console.log(buyer);
        return fetch('/api/v1/buy/',{
            method : "post",
            body : JSON.stringify(buyer),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data)
    },
    
    isAuthenticated : ()=>{
        return fetch('/user/authenticated')
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated : false, user : {email : "",password : ""}};
                });
    }

}