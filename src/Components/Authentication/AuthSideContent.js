import classes from 'Components/Authentication/AuthSideContent.module.scss'
import vector from 'assets/Icons/vectorHomePage.svg'

const content = [
  {
    id: 1,
    header: 'Voice Assistant',
    icon: vector,
    alt: 'voice',
    para: 'hello I do this',
  },
]

const AuthSideContent = (props) => {
  return (
    <div className={`${classes.auth_side_content} ${props.className}`}>
      <div
        className={`${classes.logo} text-white`}
      >AI VOICE</div>
      <div className={classes.content}>
        {content.map((data) => (
          <div key={data.id} className={classes.content_box}>
            <img src={data.icon} alt={data.alt} className={classes.img} />
            <div className={classes.text}>
              <div className={classes.sub_header}>{data.header}</div>
              <p className={classes.para}>{data.para}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.footer}>AI Voice 2025. All rights reserved.</div>
    </div>
  )
}

export default AuthSideContent
