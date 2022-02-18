import React, {Component} from 'react';
import TitleHeader from "../Component/TitleHeader/TitleHeader";
import TableEmployee from "../Component/TableEmployee/TableEmployee";

class Home extends Component {
  render() {
    return (
      <div>
        <TableEmployee/>
      </div>
    );
  }
}

export default Home;