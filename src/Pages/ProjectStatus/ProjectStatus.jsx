import React, {useContext, useState} from 'react';
import {
  Fab,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import {Accordion, AccordionDetails, AccordionSummary, TableBody, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ProjectContextEmployee} from "../../Component/Context/ContextAppProjectProvider";
import NavigatePrj from "../../Component/Navigate/NavigatePrj/NavigatePrj";
import DeleteDialogProject from "../../Component/DeleteDialogProject/DeleteDialogProject";
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";
import DialogDescription from "../../Component/DialogDescription/DialogDescription";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";


const ProjectStatus = () => {
  const contextPrj = useContext(ProjectContextEmployee);

  const [deleteProjectShow, setDeleteProjectShow] = useState(false);
  const [deleteProject, setDeleteProject] = useState(null);

  const [description, setDescription] = useState(null);
  const [descriptionShow, setDescriptionShow] = useState(false);

  const [serchValue, setSerchValue] = useState("");

  const actions = [
    {
      icon: <PrintIcon values="Print" onClick={window.print}/>, name: 'PDF'
    },
  ];

  return (
      <React.Fragment>
        <NavigatePrj/>
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
                <TableCell>Описание</TableCell>
                <TableCell align="right">Действия</TableCell>
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
                        endIcon={<SendIcon />}
                        onClick={() => {
                          setDescriptionShow(true);
                          setDescription(props);
                        }}>
                        Посмотреть
                      </Button>
                    </TableCell>


                    <TableCell align="right">
                      <IconButton onClick={() => {
                        setDeleteProjectShow(true);
                        setDeleteProject(props)
                      }}>
                        <DeleteIcon/>
                      </IconButton>

                    </TableCell>

                  </TableRow>
              ))}
            </TableBody>
          </Table>

        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>

        {deleteProjectShow && (
          <DeleteDialogProject
            props={deleteProject}
            open={deleteProjectShow}
            setDeleteProjectShow={setDeleteProjectShow}
          />
        )}
        {description && (
          <DialogDescription
          props={description}
          open={descriptionShow}
          setDescriptionShow={setDescriptionShow}/>
        )}
      </React.Fragment>
  )
}

export default ProjectStatus;