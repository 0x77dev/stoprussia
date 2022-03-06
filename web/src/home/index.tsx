import './styles.css'

import { ReactComponent as IconGithub } from './github.svg'
import { TextTitle } from '../lib/text/title'
import { TextDescr } from '../lib/text/descr'
import { ButtonLink } from '../lib/button/link'

const PageHome = () => {
  return (
    <div className="home-wrapper">
      <header className="home-header">
        <a
          target="_blank"
          href="https://github.com/0x77dev/stoprussia"
          rel="noreferrer"
        >
          <IconGithub className="icon" />
        </a>
      </header>
      <div className="home-row">
        <div className="home-content">
          <div className="home-title">
            <TextTitle>Stop russia Invasion</TextTitle>
            <TextTitle kind="primary">Save life in Ukraine!</TextTitle>
          </div>
          <div className="home-descr">
            <TextDescr>
              Let us unite and destroy russian critical infrastructure services
              (including: military, banking, travel). The list always updates to
              target services that being collectively attacked for better
              results.
            </TextDescr>
            <TextDescr>
              <strong>IMPORTANT:</strong> Make sure to use VPN to avoid region
              block and not overload your provider bandwidth — {` `}
              <a
                href="https://github.com/0x77dev/stoprussia#how-to-get-started"
                target="_blank"
                rel="noreferrer"
              >
                Learn more & How to
              </a>
            </TextDescr>
          </div>
          <div className="home-footer">
            <ButtonLink to="/battlefield">start attack</ButtonLink>
            <a
              target="_blank"
              className="link-donate"
              href="https://www.comebackalive.in.ua/"
              rel="noreferrer"
            >
              Donate to Ukraine 🇺🇦
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { PageHome }
