import React, {Component, createContext} from 'react';
import axios from "axios";

export const ProjectContextEmployee = createContext();

class ContextAppProjectProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectEmployee: [],
      message: {},
    };
    this.read();
  }

  create(event, projectEmp) {
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/project/create", projectEmp)
      .then(response => {
        if (response.data.message.level === "success") {
          let data = [...this.state.projectEmployee];
          data.push(response.data.projectEmployee);
          this.setState({
            projectEmployee: data,
            message: response.data.message
          })
        } else {
          this.setState({
            message: response.data.message
          })
        }
      }).catch(error => {
        console.error(error);
    })
  }

  read() {
    axios.get("http://127.0.0.1:8000/project/read")
      .then(response => {
        this.setState({
          projectEmployee: response.data,
        })
      }).catch(error => {
      console.error(error);
    })
  }

  delete(data) {
    axios.delete("http://127.0.0.1:8000/project/delete/" + data.id)
      .then(response => {
        //message

        let projectDelete = [...this.state.projectEmployee];
        let dataDelete   = projectDelete.find(props => {
          return props.id === data.id;
        });

        projectDelete.splice(projectDelete.indexOf(dataDelete), 1);

        this.setState({
          projectEmployee: projectDelete,
        })
      }).catch(error => {
      console.error(error);
    })
  }

  render() {
    return (
      <div>
        <ProjectContextEmployee.Provider value={{
          ...this.state,
          create: this.create.bind(this),
          delete: this.delete.bind(this),
          setMessage: (message) => this.setState({message: message})
        }}>
          {this.props.children}
        </ProjectContextEmployee.Provider>
      </div>
    );
  }
}

export default ContextAppProjectProvider;