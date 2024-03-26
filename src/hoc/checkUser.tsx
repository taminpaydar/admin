import { getCookies, setCookie, deleteCookie , hasCookie} from 'cookies-next';
import { useRouter } from "next/router";
import { config } from '@/config';
import axios from 'axios';
export const  checkLogin=async()=>{
    const router = useRouter();
    hasCookie('token') ==false && router.push('/Auth');
    let cookie =getCookies();
    await axios.get(`${config.url}/v1/auth/profile`,{
        headers:{
            Authorization:'Bearer '+cookie['token'] ,

        }
    }).then(function(res){
            return res.data;
    }).catch((err:any)=>{
       deleteCookie('token');
          router.push('/Auth');
    });


}
export async function logout(){

   await deleteCookie('token');
}
export async function  infoUser(){
    let cookie =getCookies();

  return  await axios.get(`${config.url}/v1/auth/profile`,{
        headers:{
            Authorization:'Bearer '+cookie['token'] ,

        }
    }).then(function(res){
            return res.data.message;
    })
}