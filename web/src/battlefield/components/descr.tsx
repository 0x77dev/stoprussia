import { TextDescr } from '../../lib/text/descr'

const PageBattlefieldDescr = () => {
  return (
    <div className="battlefield-descr">
      <TextDescr>
        The list of targets are split into 4 chunks each chunk called:
      </TextDescr>
      <ul>
        <li>
          <TextDescr>
            Battlefield 1: passive attack and low priority services
          </TextDescr>
        </li>
        <li>
          <TextDescr>
            Battlefield 2: passive attack and medium priority services
          </TextDescr>
        </li>
        <li>
          <TextDescr>
            Battlefield 3: active attack and medium priority services
          </TextDescr>
        </li>
        <li>
          <TextDescr>
            Battlefield 4: active attack and high priority services Battlefield
            3 and 4 is the main focus to DDoS
          </TextDescr>
        </li>
      </ul>
    </div>
  )
}

export { PageBattlefieldDescr }
