import React, {useContext, useState} from "react";
import {ProjectContextEmployee} from "../Context/ContextAppProjectProvider";
import {IconButton, Table, TableCell, TableHead, TableRow} from "@material-ui/core";
import {TableBody} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DialogDescription from "../DialogDescription/DialogDescription";
import EmployeeNav from "../Navigate/EmployeeNav/EmployeeNav";

const EmployeeList = () => {
  const contextPrj = useContext(ProjectContextEmployee);

  const [description, setDescription] = useState(null);
  const [descriptionShow, setDescriptionShow] = useState(false);

  return (
    <React.Fragment>
      <EmployeeNav/>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Проект</TableCell>
            <TableCell>Понедельник</TableCell>
            <TableCell>Вторник</TableCell>
            <TableCell>Среда</TableCell>
            <TableCell>Четверг</TableCell>
            <TableCell>Пятница</TableCell>
            <TableCell>Суббота</TableCell>
            <TableCell>Воскресенье</TableCell>
            <TableCell align="right">Описание</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {contextPrj.projectEmployee.slice().reverse().map((props, index) => (
            <TableRow key={"todo " + index}>
              <TableCell>{props.Name}</TableCell>
              {
                props.Monday === "Выходной" ?
                  (<TableCell style={{background: "greenyellow", fontWeight: 700}}>
                    {props.Monday}
                  </TableCell>)
                  :
                  (<TableCell>{props.Monday}</TableCell>)
              }


              {
                props.Tuesday === "Выходной" ?
                  (<TableCell style={{background: "greenyellow", fontWeight: 700}}>
                    {props.Tuesday}
                  </TableCell>)
                  :
                  (<TableCell>{props.Tuesday}</TableCell>)
              }

              {
                props.Wednesday === "Выходной" ?
                  (<TableCell style={{background: "greenyellow", fontWeight: 700}}>
                    {props.Wednesday}
                  </TableCell>)
                  :
                  (<TableCell>{props.Wednesday}</TableCell>)
              }

              {
                props.Thursday === "Выходной" ?
                  (<TableCell style={{background: "greenyellow", fontWeight: 700}}>
                    {props.Thursday}
                  </TableCell>)
                  :
                  (<TableCell>{props.Thursday}</TableCell>)
              }

              {
                props.Friday === "Выходной" ?
                  (<TableCell style={{background: "greenyellow", fontWeight: 700}}>
                    {props.Friday}
                  </TableCell>)
                  :
                  (<TableCell>{props.Friday}</TableCell>)
              }

              {
                props.Sunday === "Выходной" ?
                  (<TableCell style={{background: "greenyellow", fontWeight: 700}}>
                    {props.Sunday}
                  </TableCell>)
                  :
                  (<TableCell>{props.Sunday}</TableCell>)
              }

              {
                props.Saturday === "Выходной" ?
                  (<TableCell style={{background: "greenyellow", fontWeight: 700}}>
                    {props.Saturday}
                  </TableCell>)
                  :
                  (<TableCell>{props.Saturday}</TableCell>)
              }

              <TableCell>
                <Button
                  variant="contained"
                  endIcon={<SendIcon/>}
                  onClick={() => {
                    setDescriptionShow(true);
                    setDescription(props);
                  }}>
                  Посмотреть
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      {description && (
        <DialogDescription
          props={description}
          open={descriptionShow}
          setDescriptionShow={setDescriptionShow}/>
      )}
    </React.Fragment>
  )
}

export default EmployeeList;