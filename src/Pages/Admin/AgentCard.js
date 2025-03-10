import React from 'react'
import styles from './AgentCard.module.scss'
import { speakText } from 'utils/utils'

export const AgentCard = ({ agent, isSelected, onSelect, disabled }) => {
  return (
    <div className="w-[250px] p-2">
      <div className={`${styles.agent_box_outer}`}>
        <div className={`${styles.card_inner}`}>
          <input
            className={`absolute top-4 left-4 ${
              disabled ? 'cursor-default' : 'cursor-pointer'
            }`}
            type="checkbox"
            id="checkbox-id"
            checked={isSelected}
            onChange={onSelect}
          />
          <div className={`${styles.designation}`}>
            {agent.profile.profession}
          </div>
          <img src={agent.profile.profilePicture} alt={agent.name} />
        </div>
        <p className={`${styles.agent_name}`}>{agent.name}</p>
        <p className={`${styles.resolved}`}>
          Resolved {agent.queryResolved} {''}
          queries
        </p>
        <div className={`${styles.socials}`}>
          <ul>
            {agent.profile.socials.map((social) => (
              <li key={social.type}>
                <a
                  href={social.url}
                  onClick={(e) => {
                    if (disabled) e.preventDefault()
                  }}
                  className={`${
                    disabled ? 'cursor-default hover:bg-transparent' : ''
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.type}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.audio_play_button}`}>
          <button
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                speakText(
                  `Hi, this is ${agent.name} from ${agent.profile.profession}`,
                  agent.voiceName
                )
              }
            }}
          >
            Play Audio
          </button>
        </div>
      </div>
    </div>
  )
}
export default AgentCard
