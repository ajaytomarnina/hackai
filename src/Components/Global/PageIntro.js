import classes from 'Components/Global/PageIntro.module.scss'
import useClickOutside from 'hooks/useClickOutside'
import { useState } from 'react'

const PageIntro = (props) => {
  const [showOptions, setShowOptions] = useState(false)
  const optRef = useClickOutside(() => setShowOptions(false))

  return (
    <div
      ref={optRef}
      className={`${classes.page_intro} ${props.className} w-[100%]`}
    >
      {
        <div className={classes.pageInfo}>
          <div className={classes.page_name}>{props.pageName}</div>
          <div className={classes.message}>{props.message}</div>
        </div>
      }
    </div>
  )
}

export default PageIntro
