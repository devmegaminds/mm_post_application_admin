// @flow
import cx from "classnames";
import moment from "moment";
import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";

const Tr = React.forwardRef(({ days, week }, ref) => (
  <tr ref={ref} data-row={week} data-week={week}>
    {days}
  </tr>
));

const Td = React.forwardRef(
  ({ day, month, year, data, bg, onClick = (e) => e, onChange }, ref) => {
    const handleClick = useCallback(
      (e) => {
        onClick(data);

        return e.preventDefault() && e.stopPropagation();
      },
      [onClick, data]
    );
    return (
      <td
        ref={ref}
        data-day={day}
        data-month={month}
        data-year={year}
        className="p-2 text-end position-relative"
      >
        <span
          data-day={day}
          data-month={month}
          data-year={year}
          className={bg}
          onClick={handleClick}
        >
          {day}
        </span>
      </td>
    );
  }
);

const TdBade = React.forwardRef(
  ({ day, month, year, data, bg, onClick = (e) => e, onChange }, ref) => {
    const handleClick = useCallback(
      (e) => {
        onClick(data);

        return e.preventDefault() && e.stopPropagation();
      },
      [onClick, data]
    );
    return (
      <td
        ref={ref}
        data-day={day}
        data-month={month}
        data-year={year}
        className="text-end position-relative me-5"
      >
        <span
          data-day={day}
          data-month={month}
          data-year={year}
          className={bg}
          onClick={handleClick}
        >
          {day}
          <span
            className="position-absolute top-1 start-75 translate-middle badge badge-circle badge-danger"
            style={{ width: "1rem", height: "1rem" }}
          >
            &nbsp;
          </span>
        </span>
      </td>
    );
  }
);

const Days = memo(
  ({ date, specialDays = [], onChangeDay = (e) => e, rangeDate }) => {
    const [changedDate, changeDate] = useState("");

    let week = 1;

    let now = moment(date);

    let prevMonth = now.clone().subtract(1, "month");

    let day = prevMonth.daysInMonth();

    prevMonth.date(day).startOf("week");

    let nextMonth = moment(prevMonth)
      .clone()
      .add(42, "d");

    let weeks = [];
    let days = [];

    const onHandleClick = useCallback(
      (e) => {
        changeDate(e);
        return onChangeDay(e);
      },
      [date]
    );

    while (prevMonth?.isBefore(nextMonth)) {
      let classes = {
        "text-dark": false,
        "text-hover-dark bg-hover-light": true,
        "text-bold bg-light-warning text-warning": prevMonth.isSame(
          changedDate,
          "day"
        ),
        "text-white text-inverse-info bg-info bg-hover-info indigo-800":
          specialDays.findIndex(
            (d) =>
              d.day === prevMonth.date() && d.month === prevMonth.month() + 1
          ) >= 0,

        "text-bold bg-light-primary text-primary bg-hover-primary text-hover-inverse-primary": prevMonth.isSame(
          moment(),
          "day"
        ),

        "text-muted text-hover-primary bg-hover-light":
          prevMonth.year() < date.year() ||
          (prevMonth.year() === date.year() &&
            prevMonth.month() < date.month()) ||
          prevMonth.year() > date.year() ||
          (prevMonth.year() === date.year() &&
            prevMonth.month() > date.month()),

        "p-3 rounded-2 fs-6": true,
      };

      if (
        specialDays.findIndex(
          (d) => d.day === prevMonth.date() && d.month === prevMonth.month() + 1
        ) >= 0
      ) {
        days.push(
          <TdBade
            day={prevMonth.date()}
            year={prevMonth.year()}
            month={prevMonth.month()}
            key={prevMonth.month() + "-" + prevMonth.date()}
            data={prevMonth.clone()}
            bg={cx(classes)}
            onClick={onHandleClick}
          />
        );
      } else {
        days.push(
          <Td
            day={prevMonth.date()}
            year={prevMonth.year()}
            month={prevMonth.month()}
            key={prevMonth.month() + "-" + prevMonth.date()}
            bg={cx(classes)}
            data={prevMonth.clone()}
            onClick={onHandleClick}
          />
        );
      }

      if (
        prevMonth.weekday() ===
        moment()
          .endOf("week")
          .weekday()
      ) {
        weeks.push(
          <Tr
            days={days}
            key={prevMonth.month() + "-" + prevMonth.date()}
            week={prevMonth.month() + "-" + week}
          />
        );

        days = [];

        week++;
      }

      prevMonth.add(1, "d");
    }

    return <>{weeks && weeks}</>;
  }
);

export const Calender = React.forwardRef((props, ref) => {
  const { locale = "tr", format = "DD/MM/YYYY", onChange = (e) => e } = props;

  const [date, changeDate] = useState(moment(new Date()));
  const [displayDate, setDisplayDate] = useState();
  const [dayLabels, setDayLabels] = useState([]);
  const [months, setMonthLabel] = useState([]);

  useEffect(() => {
    if (locale) {
      moment().locale(locale);

      let daysLabelShort = moment.weekdaysShort(true);
      let monthsLabel = moment.months();

      setMonthLabel(monthsLabel);
      setDayLabels(daysLabelShort);
    }
  }, [locale]);

  useEffect(() => {
    if (date) {
      let now = moment(date); //, 'YYYY/MM/DD', locale);

      setDisplayDate(now.format("MMMM YYYY"));
    }

    return () => {};
  }, [date]);

  const prevHandleClick = useCallback(
    (e) => {
      e.preventDefault() && e.stopPropagation();

      let prevDate = moment(date).add(-1, "month");

      changeDate(prevDate);
    },
    [date]
  );

  const nextHandleClick = useCallback(
    (e) => {
      e.preventDefault() && e.stopPropagation();

      let prevDate = moment(date).add(1, "month");

      changeDate(prevDate);
    },
    [date]
  );

  const onHandleYearChange = useCallback(
    (e) => {
      e.preventDefault() && e.stopPropagation();

      if (e.target.value < 0) {
        return;
      }

      let prevDate = moment(date).set("year", e.target.value);

      changeDate(prevDate);
    },
    [date]
  );

  const onHandleMonthChange = useCallback(
    (e) => {
      e.preventDefault() && e.stopPropagation();

      console.log(e.target.value);

      let prevDate = moment(date).set("month", e.target.value);

      changeDate(prevDate);
    },
    [date]
  );

  const onHandleSelectDate = useCallback(
    (e) => {
      let _format = format;

      if (format.length === 0) _format = "DD/MM/YYYY";

      onChange(e.format(_format));
    },
    [format, onChange]
  );

  useEffect(() => {
    console.log(date);
  }, [date]);

  const Navigation = ({ displayDate }) => {
    return (
      <tr>
        {/*<th className="prev available">*/}
        {/*  <a href="#" className="text-dark fw-bolder text-hover-primary bg-hover-light p-3 rounded-2 fs-6">*/}
        {/*    <i className="bi bi-chevron-double-left"></i>*/}
        {/*  </a>*/}
        {/*</th>*/}
        <th className="prev available">
          <a
            href="#"
            onClick={prevHandleClick}
            className="text-dark fw-bolder text-hover-primary bg-hover-light p-3 rounded-2 fs-6"
          >
            <i class="fas fa-chevron-left"></i>
            {/* <i class="fas fa-trash-alt"></i> */}
          </a>
        </th>
        <th colSpan="5" className="text-center">
          <span className="fw-bolder text-dark">{displayDate}</span>
        </th>
        <th className="next available">
          <a
            href="#"
            onClick={nextHandleClick}
            className="text-dark fw-bolder text-hover-primary bg-hover-light p-3 rounded-2 fs-6"
          >
            <i class="fas fa-chevron-right"></i>
          </a>
        </th>
        {/*<th className="next available">*/}
        {/*  <a href="#" className="text-dark fw-bolder text-hover-primary bg-hover-light p-3 rounded-2 fs-6"><i*/}
        {/*      className="bi bi-chevron-double-right"></i>*/}
        {/*  </a></th>*/}
      </tr>
    );
  };

  const DaysLabel = ({ labels = [] }) => {
    const label = (day, i) => (
      <th key={i} data-label={day}>
        <span className="fw-bolder text-dark">{day}</span>
      </th>
    );
    return <tr>{labels.map(label)}</tr>;
  };

  return (
    <>
      <div
        ref={ref}
        className="card card-xxl-stretch mb-xl-3 p-0 border-0 min-w-350px"
      >
        <div className="card-header border-0 px-4  py-0">
          <div
            className="card-title align-items-start flex-column"
            style={{ marginTop: 20 }}
          >
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder text-dark">
                {displayDate}
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="input-group input-group-sm w-159px text-end">
              <input
                type="number"
                className="form-control form-control-sm form-control-solid"
                value={date.format("YYYY")}
                placeholder="Yıllar"
                aria-label="year"
                onChange={onHandleYearChange}
              />
              <div style={{width:2,background:'#c9c9c9',marginLeft:2,marginRight:2}}/>
              <select
                name="month"
                id="month"
                value={date.months()}
                defaultValue={date.months()}
                className="form-control form-control-sm form-control-solid"
                onChange={onHandleMonthChange}
              >
                {months.map((o, i) => (
                  <option key={i} value={i}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="card-body border-0 px-4">
          <table className="table table-condensed table-bordered">
            <thead>
              <Navigation displayDate={displayDate} />
              <DaysLabel labels={dayLabels} />
            </thead>
            <tbody>
              <Days
                date={date}
                onChangeDay={onHandleSelectDate}
                specialDays={props.specialDays}
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});
