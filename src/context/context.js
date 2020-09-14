import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext=React.createContext()
 
const GithubProvider=({children})=>{
//    React.useEffect(() => {
//        fetch('https://api.github.com/users/themanmohan').then((response) => {
//           return response.json()
//        }).then((data)=>{
//            console.log(data)
//        })
//    })
    const [githubUser, setgithubUser]=useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFallowers] = useState(mockFollowers)

    //request  loading
    const [requests,setRequests]=useState(0)
    const [isloading,setIsLoading]=useState(false)
    //error
    const [error,setError]=useState({show:false,msg:""})

    //saerch
    const githubSearch=async(user)=>{
     //     any leError();
         setIsLoading(true)
         const response=await axios(`${rootUrl}/users/${user}`).catch(err=>console.log(err))
         

        if(response){
             setgithubUser(response.data)
             const {login,followers_url}=response.data
            
             await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),
              axios(`${followers_url}?per_page=100`)]).then((result)=>{
                   const [repos,followers]=result;
                   const status='fulfilled';
                   if(repos.status===status){
                        setRepos(repos.value.data)
                   }
                   if (repos.status === status) {
                        setFallowers(followers.value.data)
                   }
              }).catch(erro=>console.log(erro))

        }else{

             checkingError(true, 'sorry user not found')
             setInterval(()=>{
                  checkingError(false, 'sorry user not found')
             },3000)
        }
          
          setIsLoading(false) 
    }
    //check req
    const checkRequest=()=>{
        axios(`${rootUrl}/rate_limit`).then(({data})=>{
             let{rate:{remaining}}=data
             setRequests(remaining)
            
             if(remaining===0){
                 checkingError(true,'sorry you exceed ypur limit')
                 //throw an error
             }
             

        }).catch((err)=>{
            console.log(err)
        })
    }
    //error
      const checkingError=(show=false,msg="")=>{
           setError({show,msg})
      }

    useEffect(checkRequest, [])
   return( <GithubContext.Provider 
         value={{githubUser,repos,followers,requests,error,githubSearch,isloading}}>
        {children}
        </GithubContext.Provider>
   )   
}

export {GithubProvider,GithubContext}