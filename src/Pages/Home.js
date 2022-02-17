import React, {Component} from 'react';
import TitleHeader from "../Component/TitleHeader/TitleHeader";
import TableEmployee from "../Component/TableEmployee/TableEmployee";

class Home extends Component {
  render() {
    return (
      <div>
        <TitleHeader/>
        <div>
          <TableEmployee/>
        </div>
      </div>
    );
  }
}

export default Home;