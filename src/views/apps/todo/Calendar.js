// ** React Import
import { useEffect, useRef, memo, Fragment, useState } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import viLocale from '@fullcalendar/core/locales/vi' // Import tiếng Việt
// import api from '../../../api'
// ** Third Party Components
import toast from 'react-hot-toast'
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'
import api from '../../../api/index'

const Calendar = props => {
  // ** Refs
  const calendarRef = useRef(null)

  // ** Props
  const {
    isRtl,
    dispatch,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    updateEvent
    // fetchEvents
  } = props

  const [events, setEvents] = useState([])

  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi])


  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0') 

  const formattedDate = `${year}-${month}-${day}`

  const transformFoodDiaryToEvents = (foodDiaryData) => {
    return foodDiaryData.reduce((acc, diary) => {
      const events = []
      
      if (diary.hasExercise) {
        events.push({
          id: diary.exerciseDiaryId,
          title: 'Bài tập',
          start: diary.date, // Chuyển đổi định dạng ngày
          allDay: true
        })
      }
      return [...acc, ...events]
    }, [])
  }

  // Hàm fetch events từ API
  const fetchCalendarEvents = () => {
    const date = new Date() 
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    api.exerciseDairyApi.getAllExerciseDairyApi(formattedDate)
      .then((rs) => {
        const transformedEvents = transformFoodDiaryToEvents(rs)
        setEvents(transformedEvents)
      })
      .catch(() => {
        toast.error('Không thể tải dữ liệu bài tập')
      })
  }

  // Gọi API khi component mount
  useEffect(() => {
    api.exerciseDairyApi.getAllExerciseDairyApi(formattedDate)
      .then((rs) => {
        const transformedEvents = transformFoodDiaryToEvents(rs)
        setEvents(transformedEvents)
        dispatch({
          type: 'UPDATE_EVENTS',
          events: transformedEvents
        })
      })
      .catch(() => {
        toast.error('Không thể tải dữ liệu bài tập') 
      })
  }, [dispatch, formattedDate])

  // Expose fetchCalendarEvents to parent through ref
  useEffect(() => {
    if (calendarApi !== null) {
      calendarApi.fetchEvents = fetchCalendarEvents
    }
  }, [calendarApi])

  // ** calendarOptions(Props)
  const calendarOptions = {
    locale: 'vi',
    locales: [viLocale], // Cung cấp locale tiếng Việt cho FullCalendar
    events,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

      return [
        // Background Color
        `bg-light-${colorName}`
      ]
    },

    eventClick({ event: clickedEvent }) {
      dispatch(selectEvent(clickedEvent))
      handleAddEventSidebar()

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
      }
    },

    dateClick(info) {
      const ev = blankEvent
      ev.start = info.date
      ev.end = info.date
      ev.selectedDate = info.date
      dispatch(selectEvent(ev))
      handleAddEventSidebar()
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent))
      toast.success('Event Updated')
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent))
      toast.success('Event Updated')
    },

    ref: calendarRef,

    // Get direction from app state (store)
    direction: isRtl ? 'rtl' : 'ltr',
    refetchEvents: fetchCalendarEvents
  }

  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} />{' '}
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)
