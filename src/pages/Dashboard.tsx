import { Typography } from '@material-ui/core'
import { navigate, RouteComponentProps } from '@reach/router'
import { User } from 'oidc-client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store'
import { GetCurrentPerson } from '../utils/person'
//Components
import AddIcon from '@material-ui/icons/Add'
import SubmitButton from '../components/Button/SubmitButton'
import DisplayNewRentals from '../components/DisplayNewRentals/DisplayNewRentals'
import EventTabs from '../components/EventTabs/EventTabs'
import MyRental from '../components/MyRental/MyRental'
import EditPersonalData from '../components/PersonalData/EditPersonalData'
import { ItemAddButton } from './items/ItemEditPage'

import { getAllPersons } from '../actions/personsActions'

// Enums
import CalendarDashboard from '../components/CalendarDashboard/CalendarDashboard'
import { Roles } from '../consts/roles'

// Assets
import imageAskQuestion from '../assets/illustration_dashboard_ask_question.svg'
import imagePersonalData from '../assets/illustration_dashboard_myData.svg'

const Header = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch()
  const currentUser = GetCurrentPerson()
  const currentPhone = currentUser?.phoneNumber
  const [openModal, setOpenModal] = useState(false)

  //Init Person Store
  useEffect(() => {
    dispatch(getAllPersons())
    if (!currentPhone) {
      setOpenModal(true) //Si l'utilisateur n'a pas de num de renseigné, une modal s'ouvre
    }
  }, [dispatch, currentPhone, openModal])

  return (
    <section className="flex flex-col">
      {/* Admin Message */}
      {/* <AdminDialog className="flex w-auto mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quoddolores maiores?
      </AdminDialog> */}
      <div className="flex flex-row mt-6 items-center justify-between">
        <Typography
          variant="h1"
          className="leading-10 pl-0"
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            letterSpacing: '2.2px',
            paddingLeft: 0,
          }}
        >
          Bienvenue, {user.profile.given_name}
        </Typography>
        {/* Button container */}
        <div className="flex flex-row">
          {user.profile.roles[0] === (Roles.admin || Roles.storekeeper) && <ItemAddButton />}

          <SubmitButton leftIcon={<AddIcon />} onClick={() => navigate('items/catalogue')}>
            Nouvelle Reservation
          </SubmitButton>
        </div>
      </div>
      {/* Section personal rentals and personal informations */}
      <div className="flex w-full flex-row mt-6">
        {/* My rentals  */}
        <div className="flex flex-col w-3/5">
          <Typography style={{ fontSize: '1rem' }} className="leading-6 text-base">
            Mes réservations
          </Typography>
          <MyRental />
        </div>
        {/* My personals data */}
        <div className="flex flex-col w-2/5">
          <Typography style={{ fontSize: '1rem' }} className="leading-6 text-base">
            Mes données personnelles
          </Typography>
          <div
            className="flex flex-row bg-white rounded-lg px-8 py-3 mt-2 justify-between"
            style={{ boxShadow: '0px 3px 6px #0000000d' }}
          >
            <div className="flex flex-col pr-8 w-full">
              <Typography
                style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
                className="text-base font-bold"
              >
                {user?.profile.given_name} {user?.profile.family_name}
              </Typography>
              <EditPersonalData
                currentUserId={currentUser?.id!}
                currentUserEmail={currentUser?.email!}
                currentUserPhone={currentUser?.phoneNumber!}
                className="mt-3"
              />
            </div>
            <div className="flex">
              <img src={imagePersonalData} alt="Mes données personnelles" />
            </div>
          </div>
        </div>
      </div>
      {/* Section calendar and event */}
      <div className="flex w-full bg-primary-light-bg my-5 calendar-container pt-4 pb-4">
        <div className="flex flex-col w-3/5">
          <CalendarDashboard />
        </div>
        <div className="flex flex-col w-2/5">
          <Typography style={{ fontSize: '1rem' }} className="leading-6 text-base">
            Événements à venir
          </Typography>
          <EventTabs />
        </div>
      </div>
      {/* Section new items and ask a question */}
      <div className="flex w-full flex-row mb-10">
        {/* New artciles */}
        <div className="flex flex-col w-8/12">
          <Typography style={{ fontSize: '1rem' }} className="leading-6 text-base">
            Nouveaux articles disponibles
          </Typography>
          <DisplayNewRentals />
        </div>
        {/* Ask questions */}
        <div className="flex flex-col w-4/12 relative">
          <div className="flex justify-end">
            <img style={{ width: '400px' }} src={imageAskQuestion} alt="Ask questions" />
            <div className="absolute text-center right-10 top-16">
              <Typography
                style={{
                  fontSize: '0.9rem',
                  marginBottom: '10px',
                  lineHeight: '1.3',
                }}
                className="leading-6 text-sm uppercase w-44 text-center"
              >
                Une question à poser à l'entreprise ?
              </Typography>
              <SubmitButton href="mailto:ce@groupe-creative.fr">Cliquez-ici</SubmitButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
const Dashboard = (_props: RouteComponentProps) => {
  const { user } = useSelector((state: RootState) => state.oidc)

  return user ? <Header user={user} /> : <></>
}
export default Dashboard
