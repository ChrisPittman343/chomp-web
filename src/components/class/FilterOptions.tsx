import React from "react";
import { Class } from "../../types/firestoreTypes";
import "./FilterOptions.css";

interface Props {
  classData: Class;
}

export const FilterOptions = (props: Props) => {
  return (
    <div className="filter-options">
      <div className="state-sorting">State</div>
      <div className="date-sorting">Date</div>
      <div className="tag-sorting">Tags</div>
    </div>
  );
};
