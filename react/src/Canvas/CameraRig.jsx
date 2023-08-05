import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import state from '../store';
// import { Group } from 'three'
function CameraRig ({children}){
    const group = useRef();
    const snap = useSnapshot(state);
    // set the model
    useFrame((state,delta)=>{
        const isBreakPoint =window.innerWidth <=1260;
        const isMobile = window.innerWidth <=900;

        let targetPostion = [-0.4,0,2];
        if(snap.intro){
            if(isBreakPoint) targetPostion=[0,0,2];
            if(isMobile) targetPostion=[0,0.2,2.5];
        }
        else{
            if(isMobile) targetPostion=[0,0,2.5];
            else targetPostion=[0,0,2];
        }
        easing.damp3(state.camera.position,targetPostion,0.25,delta)
        easing.dampE(
            group.current.rotation,
            [state.pointer.y/10,-state.pointer.x/5,0],
            0.25,
            delta
        )
    })
  return (
<group ref={group}>
  {children}  
</group>
  )
}

export default CameraRig
