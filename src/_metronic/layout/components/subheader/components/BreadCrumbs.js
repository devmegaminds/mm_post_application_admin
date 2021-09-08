/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export function BreadCrumbs({ items }) {
  if (!items || !items.length) {
    return "";
  }


  return (
    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2">
      <li className="breadcrumb-item">
        <Link to="/DashboardPage">
          <i className="flaticon2-shelter text-muted icon-1x" />
        </Link>
      </li>

      {items.map((item, index) => (
        <>
          {/* {item.title != "Carriers" && item.title != "Insurance Types" &&  item.title != "Users" && item.title != "View Error log Details"  && item.title != "App Setting"&& item.title != "Error log"&&  */}

          { item.title != "Insurancetype_reg" && item.title != "View Error log Details" && item.title != "App Setting" && item.title != "Error log" &&


            <li key={`bc${index}`} className="breadcrumb-item">
              <Link className="text-muted" to={{ pathname: item.pathname }}>
                {item.title}

              </Link>
            </li>
          }
        </>
      ))}
    </ul>
  );
}
