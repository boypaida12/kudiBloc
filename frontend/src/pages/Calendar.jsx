/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { Box, ListItem, List, Text } from "@chakra-ui/layout";

const Calender = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const handleAddDate = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent(
        {
          id: `${selected.dateStr}-${title}`,
          title,
          start: selected.startStr,
          end: selected.endStr,
          allDay: selected.allDay,
        },
        true
      );
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(`This event would be Deleted '${selected.event.title}'`)
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" backgroundColor="#">
      {/* CALENDAR SIDEBAR */}
      <Box flex="1 1 20%" bg="cyan.400" p="15px" borderRadius="4px">
        <Text fontSize={"3xl"}>Events</Text>
        <List>
          {currentEvents.map((event,id) => (
            <ListItem
              key={id}
              sx={{
                backgroundColor: "gray.100",
                color: "black",
                margin: "10px 0",
                borderRadius: "2px",
              }}
            >
              <Text fontSize="sm">
                {event.title}
                <br />
                {formatDate(event.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box flex="1 1 100%" ml="15px">
        <FullCalendar
          height="75vh"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            multiMonthPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              "dayGridMonth,timeGridWeek,timeGridDay,listMonth,multiMonthYear",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleAddDate}
          eventClick={handleEventClick}
          eventsSet={(events) => setCurrentEvents(events)}
          initialEvents={[
            {
              id: "12315",
              title: "All-day event",
              date: "2022-09-14",
            },
            {
              id: "5123",
              title: "Timed event",
              date: "2022-09-28",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Calender;
