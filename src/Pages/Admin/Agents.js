import { useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import PageIntro from 'Components/Global/PageIntro'
import UseApiCall from 'hooks/useApiCall'
import classes from 'Pages/Admin/Agents.module.scss'
import { apiAgentList } from 'services/services'
import { Grid } from 'gridjs'

const Agents = () => {
  const [agentListApi, loadingAgents, listAgents, errorAgents] = UseApiCall(
    apiAgentList,
    async (res) => {
      console.log(res)
    },
    async (err) => {
      console.log(err)
    }
  )

  const gridContainerRef = useRef(null)

  useEffect(() => {
    agentListApi()
  }, [])

  useEffect(() => {
    if (listAgents && listAgents.content && gridContainerRef.current) {
      const grid = new Grid({
        columns: [
          'Name',
          'Type',
          'Category',
          'Query Resolved',
          'Gender',
          'Online',
          'Email',
          'Phone Number'
        ],
        search: true,
        data: listAgents.content.filter(agent => agent.type === 'AGENT').map(agent => [
          agent.name,
          agent.type,
          agent.category.name,
          agent.queryResolved,
          agent.profile.gender,
          agent.online ? 'Online' : 'Offline',
          agent.profile.email || 'N/A',
          agent.profile.phone || 'N/A'
        ]),
        className: {
          container: css`
            * {
              font-size: 14px;
            }
          `,
          table: css`
            tr:hover td {
              background-color: rgba(0, 0, 0, 0.1);
            }
          `,
          th: css`
            text-align: center;
            &:hover {
              background-color: #999;
              color: #fff;
            }
          `,
          td: css`
            color: #999;
            &:hover {
              color: #000;
            }
          `
        }
      })

      grid.render(gridContainerRef.current)
    }
  }, [listAgents])

  return (
    <div className={classes.customer}>
      <PageIntro
        pageName={'Agents'}
        message={'View all your agents at one place'}
        arrBtn={[]}
        downloadBtn={true}
        exportDataList={[]}
        loadingDownloadBtn={true}
        dontShowBtn={true}
      />
      {loadingAgents ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : errorAgents ? (
        <div className={classes.errorMessage}>
          <p>Error loading agents: {errorAgents.message}</p>
        </div>
      ) : (
        <div ref={gridContainerRef} />
      )}
    </div>
  )
}

export default Agents
