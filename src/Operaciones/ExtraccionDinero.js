import React,{useState} from 'react';
import { Button, Card} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '../components/Navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import history from '../history';
import { Alert } from '@material-ui/lab';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
export default function ExtraccionDinero (props){
    const [cliente, setCliente]=useState(props.location.state);
    const[saldo, setSaldo]=useState(2500);
    const [show, setShow] = useState(false);
        const handleClose = () =>{
            setShow(false);
            history.push({
                pathname: '/BuscarExtraccionDinero',
                state:JSON.parse(localStorage.getItem('user')) })
        }
        const handleShow = () => setShow(true);
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          marginBottom: theme.spacing(2),
          width: 200,
        },
        modify: {
            padding:30,
        },
        modify1: {
            padding:10,
        },
        title:{
            fontStyle:"italic", 
            textAlign:"center",
            marginTop:"30px"
        },
        title1:{
            fontWeight: 'bold',
            textAlign:"center",
            marginTop:"5px"
        }, 
      }));
    const Number = /^[0-9]+$/;
    const classes = useStyles();
    const [display, setDisplay]=useState(false);
        return (
            <div className="Modificar">
                <Navigation />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Extraccion de dinero</h2>
                <div class="container">
                <Card className="col-sm-6 col-md-4 offset-md-4 col-lg-4 offset-lg-4 ml-6">
                    <div className={classes.modify1}>
                    <div className={classes.title1}>
                        <h4>Su Saldo: </h4><h5>$ {saldo}</h5>
                    </div>
                    </div>
                </Card>
            <div class="row">
                <div class="col-md-6 offset-md-2">
                <Formik
            initialValues={{
                nombre: (cliente.nombre),
                apellido: (cliente.apellido),
                dni: (cliente.dni),
                email: (cliente.email),
                cuit: (cliente.cuit),
                nrocuenta: (cliente.cuentas.cajaahorro),
                cantidad: "",
            }}
            validationSchema={Yup.object().shape({
                
                nombre: Yup.string()
                    .required('El campo es obligatorio (*)')
                    .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                apellido: Yup.string()
                    .required('El campo es obligatorio (*)')
                    .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                dni: Yup.string()
                    .matches(Number,'Ingrese únicamente números')
                    .required('El campo es obligatorio (*)')
                    .min(7, 'El DNI ingresado no es correcto')
                    .max(8, 'El DNI ingresado no es correcto'),
                cuit: Yup.string()
                .matches(Number,'Ingrese únicamente números')
                .required('El campo es obligatorio (*)')
                .min(11, 'El CUIT ingresado no es correcto')
                .max(11, 'El CUIT ingresado no es correcto'),
                cantidad: Yup.string()
                .required('El campo es obligatorio (*)')
            })}
            onSubmit={fields => {
                if(parseInt(fields.cantidad)>parseInt(saldo)){
                    setDisplay(true)
                }else{
                    setDisplay(false)
                    setSaldo(parseInt(saldo)-parseInt(fields.cantidad))
                    alert(JSON.stringify(fields, null, 4))
                    setShow(true);
                }
            }}
            render={({ errors, status, touched }) => (
                <Card  className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-2">
                <div className={classes.modify}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Entidad</label>
                        <Field name="nombre" type="text"  readOnly className={'form-control' + (errors.nombre && touched.nombre ? ' is-invalid' : '')} />
                        <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <Field name="apellido" type="text" readOnly className={'form-control' + (errors.apellido && touched.apellido ? ' is-invalid' : '')} />
                        <ErrorMessage name="apellido" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <Field name="dni" type="text" readOnly  className={'form-control' + (errors.dni&& touched.dni ? ' is-invalid' : '')} />
                        <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cuit">CUIT</label>
                        <Field name="cuit" type="text" readOnly   className={'form-control' + (errors.cuit && touched.cuit ? ' is-invalid' : '')} />
                        <ErrorMessage name="cuit" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cuit">Número de Cuenta</label>
                        <Field name="nrocuenta" type="text" readOnly   className={'form-control' + (errors.nrocuenta && touched.nrocuenta ? ' is-invalid' : '')} />
                        <ErrorMessage name="nrocuenta" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cuit">Cantidad a extraer ($)</label>
                        <Field name="cantidad" type="text"   className={'form-control' + (errors.cantidad && touched.cantidad ? ' is-invalid' : '')} />
                        <ErrorMessage name="cantidad" component="div" className="invalid-feedback" />
                        {display && (
                                    <Alert severity="error">No cuenta con el dinero suficiente</Alert>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2" style={{backgroundColor: "#BF6D3A", marginTop:"15px"}}>Realizar extraccion</button>
                    </div>
                </Form>
                </div>
                </Card>
            )}
        />
                </div>
            </div>
            </div>
            </div>     
            </div>
            <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Extracción realizada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">La extracción ha sido realizada exitosamente</Alert>
                <Alert severity="warning">Su nuevo saldo es de $ {saldo}</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#BF6D3A"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
            </div>
        );
    }