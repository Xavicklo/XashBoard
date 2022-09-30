import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
const Employees = () => {
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={employees}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Employees;
