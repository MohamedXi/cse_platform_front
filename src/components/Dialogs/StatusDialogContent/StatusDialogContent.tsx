import './StatusDialogContent.scss'

// Assets
import successBackgroundImage from '../../../assets/success.png'
import errorBackgroundImage from '../../../assets/error.png'

// Enums
import { StatusDialogContentType } from '../../../consts/global'

export interface StatusDialogContentProps {
  status: StatusDialogContentType
  message: string
}

function StatusDialogContent({ status, message }: StatusDialogContentProps) {
  const backgroundImageUrl = status === StatusDialogContentType.SUCCESS ? successBackgroundImage : errorBackgroundImage
  return (
    <div className="status--dialog--content" style={{ backgroundImage: ` url(${backgroundImageUrl})` }}>
      <div className="status--dialog--content__messages">
        <p className="status--dialog--content__messages__title">
          {status === StatusDialogContentType.SUCCESS ? 'Bien joué !' : 'Dommage !'}
        </p>
        <div className="w-10 mt-2 mb-4 bg-primary-light" style={{ width: 65, height: 2 }} />
        <p className="status--dialog--content__messages__msg">{message}</p>
      </div>
    </div>
  )
}

export default StatusDialogContent
