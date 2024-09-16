import React from 'react'
import { useParams } from 'react-router-dom'

const WithRoute = (ClassWithRoute) => {

    const Data = ()=>{
        let params = useParams();
        console.log(params,"params");
        return <ClassWithRoute params={params} />
    }

  return Data;
}

export default WithRoute
