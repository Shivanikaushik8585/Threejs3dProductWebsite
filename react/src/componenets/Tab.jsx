import React from 'react'
import { useSnapshot } from 'valtio'
import  state from '../store';


function Tab({tab,isFiterTab,isActiveTab,handleClick}) {
 const snap = useSnapshot(state);
 const activeStyles = isFiterTab && isActiveTab 
 ? {backgroundColor:snap.color,opacity:0.5}:
 {backgroundColor:'transparent',opacity:1}
  return (
    <div
  key={tab.name}
  className={`tab-btn ${isFiterTab ? 'rounded-full glassmorhism': 'rounded-4'}`}
    onClick={handleClick}>
      <img src={tab.icon} alt="tab.icon" 
       className={`${isFiterTab ?'w-2/3 h-2/3':'w-11/12 h-11/12'}`}
       />

      
    </div>
  )
}

export default Tab
