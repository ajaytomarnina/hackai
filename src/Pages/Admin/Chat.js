import PageIntro from 'Components/Global/PageIntro'
import classes from 'Pages/Admin/Dashboard.module.scss'
import { useEffect } from 'react'

const Chat = () => {
  // useEffect(() => {
  //   const sdkRoot = document.getElementById('sdk-root');
  //   const hasClientId = localStorage.getItem('CLIENT_ID');
    
  //   if (sdkRoot && hasClientId) {
  //     sdkRoot.style.display = 'block';
  //   }
    
  //   return () => {
  //     const element = document.getElementById('sdk-root');
  //     if (element) {
  //       element.style.display = 'none';
  //     }
  //   }
  // }, [])

  return (
    <div className={classes.dashboard}>
      <PageIntro
        pageName={'Chat'}
        message={'Chat with your agent'}
        arrBtn={[]}
        dontShowBtn={true}
      />
      
    </div>
  )
}
export default Chat
