import React, {Component} from 'react'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import api from "../service/api";
import '../App.css'

class CreateTarefa extends Component {
    constructor(props){
        super(props)

        this.state = {
            openModal: this.props.openModal,
            dataInicial: new Date(),
            dataFinal: new Date(),
            nome: '',
        }
    }

    componentDidMount() {

    }

    

    selectDateInicial = (date) => {
        this.setState({
            dataInicial: date
        });
    }

    selectDateFinal = (date) => {
        this.setState({
            dataFinal: date
        });
    }


    render(){
        const {openModal} = this.state   
        console.log(openModal)     
        return (            
            <Modal className="container-modal cadastro" open={openModal}>
                <form className="form-cadastro" noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Nome tarefa"                                                                        
                        margin="normal"
                        variant="outlined"
                        className="input-cadastro"
                    />
                    <div>
                        <p>Data Inicial</p>
                        <DatePicker 
                            className="datapicker"
                            selected={this.state.dataInicial}
                            onChange={this.selectDateInicial}
                            placeholderText="Data inicio da tarefa"
                        />
                        <p>Data Final</p>
                        <DatePicker 
                            className="datapicker"
                            selected={this.state.dataFinal}
                            onChange={this.selectDateFinal}
                            placeholderText="Data final da tarefa"
                        />                        
                    </div>
                    <FormControl>
                            <InputLabel htmlFor="age-simple">Pessoas</InputLabel>
                            <Select>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                
                            </Select>
                        </FormControl>
                </form>
            </Modal>
        )
    }
}

export default CreateTarefa