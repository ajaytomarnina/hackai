import PageIntro from 'Components/Global/PageIntro'
import classes from 'Pages/Admin/Dashboard.module.scss'
// import VoiceChat from './VoiceChat'
import AgentCard from './AgentCard'
import { apiAgentList, apiAttachAgentToClient, apiCreateClient } from 'services'
import UseApiCall from 'hooks/useApiCall'
import { useEffect, useRef, useState } from 'react'
import TextInput from 'Layout/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardActions } from 'Store/global-redux'
import Button from 'Layout/Button'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedAgentId, setSelectedAgentId] = useState(null)
  const focusRef = useRef(null)
  const noneRef = useRef(null)
  const companyName = useSelector((state) => state.dashboard.companyName)
  const clientId = useSelector((state) => state.dashboard.clientId)
  const [isBlurred, setIsBlurred] = useState(true)

  const [agentListApi, loadingAgents, listAgents] = UseApiCall(
    apiAgentList,
    async (res) => {
      console.log(res)
    },
    async (err) => {
      console.log(err)
    }
  )

  const [createClientApi] = UseApiCall(
    apiCreateClient,
    async (res) => {
      console.log(res)
      dispatch(DashboardActions.setClientId(res.clientId))
      setIsBlurred(false)
    },
    async (err) => {
      console.log(err)
      setIsBlurred(true)
    }
  )

  const [attachAgentApi] = UseApiCall(
    apiAttachAgentToClient,
    async (res) => {
      localStorage.setItem('CLIENT_ID', res.clientId)
      localStorage.setItem('agentName', res.name)
      localStorage.setItem('agentRole', res.profile.profession)
      localStorage.setItem('voice', res.voiceName)
      navigate('/chat')
    },
    async (err) => {
      console.log(err)
    }
  )

  const handleCreateClient = (clientName) => {
    createClientApi({ clientName })
  }

  const handleAttachAgent = () => {
    console.log(clientId, selectedAgentId, 'clientId, selectedAgentId')
    attachAgentApi({ clientId, agentId: selectedAgentId })
  }

  useEffect(() => {
    agentListApi()
  }, [])

  const companyNameValidation = [
    (value) => typeof value === 'string' && value.trim() !== '',
  ]

  console.log(clientId, selectedAgentId, 'clientId, selectedAgentId')

  return (
    <div className={classes.dashboard}>
      <PageIntro
        pageName={'Dashboard'}
        message={'Track and Manage AI Voice Agent Chat'}
        arrBtn={[]}
        dontShowBtn={true}
      />
      {/* <VoiceChat /> */}
      <div className="flex h-[100px] gap-4 mb-16">
        <TextInput
          type="text"
          text="Company Name"
          className={`${classes.input} !h-[48px]`}
          errorMessage="Please enter a valid company name"
          validation={companyNameValidation}
          setInput={(value) => {
            dispatch(DashboardActions.setCompanyName(value))
          }}
          enteredInput={companyName}
          maxLength={128}
          name="email"
          focusRef={focusRef}
          noneRef={noneRef}
          disabled={!isBlurred}
        />
        <Button
          text={'Create'}
          disabled={companyName === '' || !isBlurred}
          className={`h-[80px] ${classes.btn} ${
            companyName === '' || !isBlurred ? classes.disabled : classes.abled
          }`}
          onClick={() => handleCreateClient(companyName)}
        />
      </div>
      <div className={`flex flex-wrap gap-4 ${isBlurred ? 'blur-sm' : ''}`}>
        {listAgents &&
          listAgents.content
            .filter((agent) => agent.type === 'AGENT')
            .map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgentId === agent.id}
                onSelect={() => {
                  if (!isBlurred) {
                    setSelectedAgentId(agent.id)
                  }
                }}
                disabled={isBlurred}
              />
            ))}
      </div>
      <div
        className={`w-full mt-8 ${
          isBlurred ? 'hidden' : 'flex justify-center'
        }`}
      >
        <Button
          text={'Save'}
          disabled={companyName === '' || selectedAgentId === null}
          className={`h-[80px] w-[320px] ${classes.btn} ${
            companyName === '' || selectedAgentId === null
              ? classes.disabled
              : classes.abled
          }`}
          onClick={() => handleAttachAgent()}
        />
      </div>
    </div>
  )
}
export default Dashboard
