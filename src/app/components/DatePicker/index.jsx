// @flow

import cx from "classnames";
import * as React from "react";
import { memo, useCallback, useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";

import { Calender } from "./calender";

const DateInput = React.forwardRef((props, ref) => {
  const [position, setPosition] = useState({
    current: undefined,
    focused: false,
  });

  const handleClick = useCallback(
    (e) => {
      e.preventDefault() && e.stopPropagation();
      props.onClick(e);
    },
    [props]
  );
  const handleFocus = useCallback(
    (e) => {
      e.preventDefault() && e.stopPropagation();
      let inputFocused = e.target.name || e.target.id;
      e.target.style.cursor = "pointer";

      // if (position.current === inputFocused && position.focused === true) {
      //   return;
      // }
      setPosition({});
      setPosition({ current: inputFocused, focused: true });

      console.log("Focus=>", e);
      //console.log( formControlRef.current.blur());
    },
    [ref, position, props]
  );

  const handleBlur = useCallback(
    (e) => {
      e.stopPropagation() && e.preventDefault();

      let inputFocused = e.target.name || e.target.id;

      setPosition({ current: inputFocused, focused: false });

      console.log("blur=>", e);
      //props.onClick(e);
    },
    [setPosition, props]
  );

  return (
    <div ref={ref}>
      <Form.Control
        aria-label={props.label}
        name={props.name}
        id={props.id}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={props.displayDate}
        style={{ cursor: "pointer" }}
        placeholder={props.placeholder}
        className={cx(
          "form-control",
          "form-control-solid",
          "position-relative",
          {
            focus: position.focused,
            "select-focus": position.focused,
          }
        )}
      />
    </div>
  );
});

const Component = React.forwardRef((props, ref) => {
  const componentRef = useRef(ref);

  const [date, changeDate] = useState();
  const {
    placeholder,
    label,
    className,
    id,
    name,
    clearable = false,
    disabled = false,
    "aria-labelledby": ariaLabel,
  } = props;

  const onHandleChangeDate = useCallback(
    (date) => {
      changeDate(date);
    },
    [changeDate]
  );

  return (
    <div className="position-relative" id={name}>
      <div className={cx("position-relative")} ref={componentRef}>
        <div className="position-relative">
          <Dropdown>
            <Dropdown.Toggle
              as={DateInput}
              label={label}
              aria-label={ariaLabel}
              placeholder={placeholder}
              displayDate={date}
            >
              Seç
            </Dropdown.Toggle>
            <DropdownMenu>
              <Calender
                format={props.format}
                locale={props.locale}
                specialDays={props.specialDays}
                onChange={onHandleChangeDate}
              />
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
});

export const DateTimePicker = memo(Component);
