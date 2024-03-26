export function ShowEye({ show  ,width='20px'}: any) {
    return (  
            show== true ?
            <img src="/assets/eye.svg" width={width} />
            :
            <img src="/assets/eyeoff.svg"  width={width}  />  
    )
    };