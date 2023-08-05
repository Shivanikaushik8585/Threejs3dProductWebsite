import React ,{useState} from 'react';
import {AnimatePresence,motion} from "framer-motion";
import { useSnapshot } from 'valtio';
 import config from '../config/config'
 import state from '../store';
 import {download} from '../assets';
 import {downloadCanvasToImage,reader} from '../config/helpers'
 import { EditorTabs,FilterTabs,DecalTypes} from "../config/constants"
 import {fadeAnimation,slideAnimation} from '../config/motion'
 import { AiPicker,ColorPicker,Tab,FilePicker,CustomButton } from '../componenets';

function Customize() {
  const snap = useSnapshot(state);
  const[file,setFile]=useState(' ');
  const[prompt,setPrompt]= useState("");
  const[generatingImg,setgeneratingImg] = useState('false');
  const[activeEditorTab,setactiveEditorTab]= useState('');
  const[activateFilterTab,setActivateFilterTab] = useState({
    logoShirt:true,
    styleShirt:false,

  })
  // show activateTab
  const generateTabContent=()=>{
    switch(activeEditorTab){
      case "colorpicker":
      return <ColorPicker/>
      case "filepicker":
        return <FilePicker 
          file={file} 
          setFile={setFile} 
          readFile= {readFile} />
        case "aipicker":
          return <AiPicker
          prompt={prompt}
          setPrompt={setPrompt}
          geneatingImg={generatingImg}
          handleSubmit ={handleSubmit}

          />
        default :
        return null;  


    }

  }
  const handleSubmit = async (type)=>{
    if(!prompt) return alert('please enter a prompt');
    try{
      setgeneratingImg(true);
      const response = await fetch('http://localhost:3000/api/v1/dalle',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          prompt,
        })
      })
const data = await response.json();
handleDecals( type,`data:image/png;base64,${data.photo}`)
    }catch(e){
      alert(e)
    }finally{
      setgeneratingImg(false);
      setactiveEditorTab(" ");
    }

  }
  const handleDecals= (type,result) =>{
    const  decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if(!activateFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }

  }
  const handleActiveFilterTab = (tabName) =>{
    switch(tabName){
      case "logoShirt":
        state.isLogoTexture= !activateFilterTab[tabName];
      break ;
      case "stylishShirt":
        state.isFullTexture = !activateFilterTab[tabName];
        break;
        default:
          state.isFullTexture = true;
          state.isLogoTexture = false;
          break;

    }
    setActivateFilterTab((prevState) =>{
      return {
        ...prevState,
        [tabName]:!prevState[tabName]
      }
    })
  }
  const readFile=(type)=>{
    reader(file)
    .then((result)=>{
    handleDecals(type,result);
    setactiveEditorTab(' ');
  })
}
  return (
    <div>
      <AnimatePresence>
        {!snap.intro &&(
          
             <>
          <motion.div  key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className="editortabs-container tabs">
              {EditorTabs.map((tab) =>(
                <Tab key={tab.name}
                tab ={tab}
                handleClick={()=>setactiveEditorTab(tab.name) }
                />

               ) )}
               {generateTabContent()}
              </div>
            </div>
           </motion.div>
           <motion.div className='absolute z-10 top-5 right-5'
            {...fadeAnimation}>
              <CustomButton type="filled" title="Go back" 
              handleClick={()=> state.intro=true}
              customStyle='w-fit px-4 py-2.5 font-bold text-sm'/>


           </motion.div>
           <motion.div className="Filtertabs-container"
           {...slideAnimation('up')}
           >
             {FilterTabs.map((tab) =>(
                <Tab key={tab.name}
                tab ={tab}
                isFilterTab
                isActiveTab={activateFilterTab[tab.name]}
                handleClick={()=>handleActiveFilterTab(tab.name)}
                />

               ) )}
     

           </motion.div>
           <motion.div className='filtertabs-container'
           {...slideAnimation('up')}>

{FilterTabs.map((tab) =>(
                <Tab key={tab.name}
                tab ={tab}
                isFiterTab
                isActiveTab={activateFilterTab[tab.name]}
                handleClick={()=>handleActiveFilterTab(tab.name) }
                />

               ) )}
           </motion.div>
                 </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Customize
