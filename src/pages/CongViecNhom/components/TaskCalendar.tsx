import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import React, { useMemo } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TaskCalendar.less';

const localizer = momentLocalizer(moment);

type Props = {
	tasks: CongViecNhom.Task[];
};

const TaskCalendar: React.FC<Props> = ({ tasks }) => {
	const events = useMemo(() => {
		return tasks
			.filter((t) => t.thoiHan)
			.map((t) => {
				const m = moment(t.thoiHan);
				return {
					title: t.tenCongViec,
					start: m.clone().startOf('day').toDate(),
					end: m.clone().endOf('day').toDate(),
					resource: t,
				};
			});
	}, [tasks]);

	return (
		<div className='cvn-calendar-wrap'>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 560 }}
				popup
			/>
		</div>
	);
};

export default TaskCalendar;
