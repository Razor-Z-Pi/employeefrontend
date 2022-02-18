import React from 'react';
import {Table, TableCell, TableHead, TableRow} from "@material-ui/core";

const ProjectStatus = () => {
  return (
    <React.Fragment>
      <form>
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
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </form>
    </React.Fragment>
  )
}

export default ProjectStatus;