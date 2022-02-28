import React, {Component, createContext} from 'react';
import axios from "axios";

export const ItemContext = createContext();
const config = {
  headers: {
    accept: "application/json",
    contentType: "application/json",
  }
}

class ContextAppProvider extends Component {

  // состояние обьектов массива для сотрудников
  constructor(props) {
    super(props);
    this.state = {
      employee: [],
      message: {},
    };
    this.read();
  }

  //create
  create(event, employee) {
    event.preventDefault();
    axios.post("https://127.0.0.1:8000/api/employee/create", employee)
      .then(response => {
        if (response.data.message.level === "success") {
          let data = [...this.state.employee];
          data.push(response.data.employee);
          this.setState({
            employee: data,
            message: response.data.message,
          })
        } else {
          this.setState({
            message: response.data.message,
          })
        }
      }).catch(error => {
      console.error(error);
    })
  }

  //read
  read() {
    axios.get("https://127.0.0.1:8000/api/employee/read")
      .then(response => {
        this.setState({
          employee: response.data,
        })
      }).catch(error => {
      console.error(error);
    })
  }

  //update
  update(data) {
    axios.put("http://127.0.0.1:8000/api/employee/update/" + data.id, data, config)
      .then(response => {
        let dataEmployee = [...this.state.employee];
        let dataSerch = dataEmployee.find(props => {
          return props.id === data.id
        });

        dataSerch.fname = data.fname;
        dataSerch.lname = data.lname;
        dataSerch.position = data.position;

        this.setState({
          employee: dataEmployee,
        });

      }).catch(error => {
      console.log(error);
    })
  };

  //delete
  delete(data) {
    axios.delete("http://127.0.0.1:8000/api/employee/delete/" + data.id, config)
      .then(response => {
        //message

        let employee = [...this.state.employee];
        let dataDelete   = employee.find(props => {
          return props.id === data.id;
        });

        employee.splice(employee.indexOf(dataDelete), 1);

        this.setState({
          employee: employee,
        })
      }).catch(error => {
      console.error(error);
    })
  };

  render() {
    return (
      <div>
        <ItemContext.Provider value={{
          ...this.state,
          create: this.create.bind(this),
          update: this.update.bind(this),
          delete: this.delete.bind(this),
          setMessage: (message) => this.setState({message: message})
        }}>
          {this.props.children}
        </ItemContext.Provider>
      </div>
    );
  }
}

export default ContextAppProvider;