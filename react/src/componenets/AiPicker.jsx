import React from 'react'
import CustomButton from './CustomButton'

function AiPicker({prompt,setPrompt,generateingImg,handleSubmit}) {
  return (
    <div className='aipicker-container'>
      <textarea placeholder='Ask Ai' rows={5} value={prompt}
      onChange={(e)=>setPrompt(e.target.value)} className='aipicker-textarea'></textarea>
      <div className='flex flex-wrap gap-3'>
        {generateingImg?(
           <CustomButton
           type="outline"
           title="Asking Ai..."
           customStyle="text-xs"
           />
        ):(
          <>
          <CustomButton
          type="outline"
          title="AI LOGO"
          handleClick={()=>handleSubmit('logo')}
          customStyle="text-xs"
        
          />
           <CustomButton
          type="filled"
          title="AI FULL"
          handleClick={()=>handleSubmit('full')}
          customStyle="text-xs"
        
          />

          </>
        )
        }
        
      </div>
    </div>
  )
}

export default AiPicker
