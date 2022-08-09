import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import Header from ".//Header"
import Select from "react-select"
import { toast } from "react-toastify"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { Navigation, Edit } from "react-feather"
import "./Application.css"

const Application = () => {
  const [appAcronym, setAppAcronym] = useState("")
  const { appAcronyms } = useParams()
  const [appDesc, setAppDesc] = useState("")
  const [appRno, setAppRno] = useState("")
  const [appStart, setAppStart] = useState("")
  const [appEnd, setAppEnd] = useState("")
  const [appCreate, setAppCreate] = useState()
  const [appOpen, setAppOpen] = useState()
  const [appToDo, setAppToDo] = useState()
  const [appDoing, setAppDoing] = useState()
  const [appDone, setAppDone] = useState()
  const [dropdown, setDropdown] = useState([])
  const [userData, setUserData] = useState([])

  const [selectedOption, setSelectedOption] = useState()
  const [selectedOption1, setSelectedOption1] = useState()
  const [selectedOption2, setSelectedOption2] = useState()
  const [selectedOption3, setSelectedOption3] = useState()
  const [selectedOption4, setSelectedOption4] = useState()

  const [show, setShow] = useState(false)
  const [unshow, setUnShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleUnShow = () => setUnShow(true)

  const handleClose = () => {
    setShow(false)
    setAppAcronym("")
    setAppDesc("")
    setAppRno("")
    setAppStart("")
    setAppEnd("")
    setSelectedOption("")
    setSelectedOption1("")
    setSelectedOption2("")
    setSelectedOption3("")
    setSelectedOption4("")
  }

  const handleUnClose = () => {
    setUnShow(false)
  }

  //handle dropdown select value
  const handleChange = selectedOption => {
    setSelectedOption(selectedOption)
    setAppCreate(selectedOption.value)
    console.log(selectedOption)
  }

  const handleChange1 = selectedOption1 => {
    setSelectedOption1(selectedOption1)
    setAppOpen(selectedOption1.value)
    console.log(selectedOption1)
  }

  const handleChange2 = selectedOption2 => {
    setSelectedOption2(selectedOption2)
    setAppToDo(selectedOption2.value)
    console.log(selectedOption2)
  }

  const handleChange3 = selectedOption3 => {
    setSelectedOption3(selectedOption3)
    setAppDoing(selectedOption3.value)
    console.log(selectedOption3)
  }

  const handleChange4 = selectedOption4 => {
    setSelectedOption4(selectedOption4)
    setAppDone(selectedOption4.value)
    console.log(selectedOption4)
  }

  //trigger function on submission of form
  const handleSubmit = async e => {
    e.preventDefault()
    if (!appAcronym || !appRno || !appDesc) {
      toast.error("Please provide value for the required fields", { autoClose: 1000 })
    }
    {
      const response = await Axios.post("http://localhost:5000/api/postApplication", {
        app_Acronym: appAcronym,
        app_Desc: appDesc,
        app_Rno: appRno,
        app_Start: appStart,
        app_End: appEnd,
        app_Create: appCreate,
        app_Open: appOpen,
        app_ToDo: appToDo,
        app_Doing: appDoing,
        app_Done: appDone
      }).catch(e => { 
        console.log(e)
      })
      const isDuplicate = response.data
      if (appAcronym && appRno && appDesc && isDuplicate !== false) {
        toast.success("Application Created!", { autoClose: 1000 })
        //clear all input values if create application is successful
        setAppAcronym("")
        setAppDesc("")
        setAppRno("")
        setAppStart("")
        setAppEnd("")
        setSelectedOption("")
        setSelectedOption1("")
        setSelectedOption2("")
        setSelectedOption3("")
        setSelectedOption4("")
      } else {
        toast.error("Duplicate Acronym Detected", { autoClose: 1500 })
        setAppAcronym("")
        setAppDesc("")
        setAppRno("")
        setAppStart("")
        setAppEnd("")
        setSelectedOption("")
        setSelectedOption1("")
        setSelectedOption2("")
        setSelectedOption3("")
        setSelectedOption4("")
      }
    }
  }

  const handleSubmits = e => {
    e.preventDefault()
    if (!appAcronym || appDesc || !appRno) {
      toast.error("Please fill up required fields before updating!", { autoClose: 1000 })
    } else {
      Axios.put(`http://localhost:5000/api/updateApplication/${appAcronyms}`, {
        app_Desc: appDesc,
        app_Rno: appRno,
        app_Start: appStart,
        app_End: appEnd,
        app_Create: appCreate,
        app_Open: appOpen,
        app_ToDo: appToDo,
        app_Doing: appDoing,
        app_Done: appDone
      }).catch(e => {
        console.log(e)
      })
      if (appAcronym && appRno && appDesc !== "") {
        toast.success("Application Updated!", { autoClose: 1000 })
      } 
    }
  }

  useEffect(() => {
    const getApp = async () => {
      const response = await Axios.get("http://localhost:5000/api/getApplication")
      console.log(response)
      setUserData(response.data)
    }
    getApp()
  }, [])

  //Load database group values into dropdown list
  useEffect(() => {
    const getGroup = async () => {
      const response = await Axios.get("http://localhost:5000/api/getGrouping")
      console.log(response)
      setDropdown(response.data)
    }
    getGroup()
  }, [])

  return (
    <>
      <Header />
      <div style={{ marginTop: "50px" }}>
        <h2>Application</h2>
        <div className="border d-flex align-items-center justify-content-center">
          <Button variant="primary" onClick={handleShow}>
            Add Application
          </Button>
        </div>
        <Container>
          <Row>
            {userData.map((userData, k) => (
              <Col key={userData.App_Acronym} xs={12} md={4} lg={3}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{ display: "flex" }}>
                      {userData.App_Acronym}
                      <a className="nav-links" onClick={handleUnShow}>
                        <Edit />
                      </a>
                      <Link to={`/taskpage/${userData.App_Acronym}`}>
                        <a className="nav-link">
                          <Navigation />
                        </a>
                      </Link>
                    </Card.Title>
                    <Card.Subtitle>Running Number: {userData.App_Rnumber}</Card.Subtitle>
                    <Card.Text>{userData.App_Description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Modal size="xl" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ borderRadius: "100%" }}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAppAcronym">
                  <Form.Label>App Acronym</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="App name..."
                    autoFocus
                    value={userData.appAcronyms}
                    onChange={e => {
                      setAppAcronym(e.target.value)
                    }}
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridRunningNumber">
                  <Form.Label>App Running Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Running Number..."
                    value={appRno}
                    onChange={e => {
                      setAppRno(e.target.value)
                    }}
                  />
                </Form.Group>
              </Row>
              <Form.Group as={Col} className="mb-4" controlId="exampleForm.ControlTextarea1">
                <Form.Label>App Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="App Description..."
                  rows={3}
                  value={appDesc}
                  onChange={e => {
                    setAppDesc(e.target.value)
                  }}
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlD="formGridStart">
                  <Form.Label>App Start Date</Form.Label>
                  <Form.Control
                    className="input1"
                    type="date"
                    value={appStart}
                    onChange={e => {
                      setAppStart(e.target.value)
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlID="formGridEnd">
                  <Form.Label>App End Date</Form.Label>
                  <Form.Control
                    className="input2"
                    type="date"
                    value={appEnd}
                    onChange={e => {
                      setAppEnd(e.target.value)
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridOpen">
                  <Form.Label>App Permit Create</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange}
                    value={selectedOption}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridOpen">
                  <Form.Label>App Permit Open</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange1}
                    value={selectedOption1}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridToDo">
                  <Form.Label>App Permit ToDo</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange2}
                    value={selectedOption2}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDoing">
                  <Form.Label>App Permit Doing</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange3}
                    value={selectedOption3}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDone">
                  <Form.Label>App Permit Done</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange4}
                    value={selectedOption4}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal size="xl" show={unshow} onHide={handleUnClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ borderRadius: "100%" }}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAppAcronym">
                  <Form.Label>App Acronym</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="App name..."
                    autoFocus
                    value={appAcronym}
                    onChange={e => {
                      setAppAcronym(e.target.value)
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridRunningNumber">
                  <Form.Label>App Running Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Running Number..."
                    value={appRno}
                    onChange={e => {
                      setAppRno(e.target.value)
                    }}
                  />
                </Form.Group>
              </Row>
              <Form.Group as={Col} className="mb-4" controlId="exampleForm.ControlTextarea1">
                <Form.Label>App Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="App Description..."
                  rows={3}
                  value={appDesc}
                  onChange={e => {
                    setAppDesc(e.target.value)
                  }}
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlD="formGridStart">
                  <Form.Label>App Start Date</Form.Label>
                  <Form.Control
                    className="input1"
                    type="date"
                    value={appStart}
                    onChange={e => {
                      setAppStart(e.target.value)
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlID="formGridEnd">
                  <Form.Label>App End Date</Form.Label>
                  <Form.Control
                    className="input2"
                    type="date"
                    value={appEnd}
                    onChange={e => {
                      setAppEnd(e.target.value)
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridOpen">
                  <Form.Label>App Permit Create</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange}
                    value={selectedOption}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridOpen">
                  <Form.Label>App Permit Open</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange1}
                    value={selectedOption1}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridToDo">
                  <Form.Label>App Permit ToDo</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange2}
                    value={selectedOption2}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDoing">
                  <Form.Label>App Permit Doing</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange3}
                    value={selectedOption3}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDone">
                  <Form.Label>App Permit Done</Form.Label>
                  <Select
                    className="reactSelect"
                    options={dropdown.map(data => {
                      return { label: data.usergroup, value: data.usergroup }
                    })}
                    onChange={handleChange4}
                    value={selectedOption4}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUnClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmits}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Application
