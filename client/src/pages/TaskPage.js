import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { ChevronLeft, LogOut } from "react-feather"
import "./TaskPage.css"

const TaskPage = () => {
  const [planName, setPlanName] = useState("")
  const [planStart, setPlanStart] = useState("")
  const [planEnd, setPlanEnd] = useState("")
  const [planAppName, setPlanAppName] = useState("")
  const [userData, setUserData] = useState([])

  const [taskName, setTaskName] = useState("")
  const [taskDesc, setTaskDesc] = useState("")
  const [taskNote, setTaskNote] = useState("")
  const [taskId, setTaskId] = useState("")
  const [taskPlan, setTaskPlan] = useState()
  const [taskAppAcronym, setTaskAppAcronym] = useState("")
  const [taskState, setTaskState] = useState("")
  const [taskCreator, setTaskCreator] = useState("")
  const [taskOwner, setTaskOwner] = useState("")
  const [taskDate, setTaskDate] = useState("")
  const [user, setUser] = useState("")
  const [data, setData] = useState("")
  const [show, setShow] = useState(false)
  const [unshow, setUnShow] = useState(false)
  const { App_Acronym } = useParams()

  const handleClose = () => {
    setShow(false)
    setPlanName("")
    setPlanStart("")
    setPlanEnd("")
    setPlanAppName("")
  }
  const handleShow = () => setShow(true)

  const handleUnClose = () => setUnShow(false)
  const handleUnShow = () => setUnShow(true)

  const navigate = useNavigate()

  async function handleLogout(e) {
    localStorage.removeItem("login")
    localStorage.removeItem("username")
    navigate("/")
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!planName || !planStart || !planEnd || !planAppName) {
      toast.error("Please provide value for the required fields", { autoClose: 1000 })
    }
    {
      const response = await Axios.post("http://localhost:5000/api/postPlan", {
        plan_Name: planName,
        plan_Start: planStart,
        plan_End: planEnd,
        plan_app_Acronym: planAppName
      }).catch(e => {
        console.log(e)
      })
      const isDuplicate = response.data
      if (planName && planStart && planEnd && isDuplicate !== false) {
        toast.success("Plan Created!", { autoClose: 1000 })
        //clear all input values if create plan is successful
        setPlanName("")
        setPlanStart("")
        setPlanEnd("")
        setPlanAppName("")
      } else {
        toast.error("Duplicate Plan Name Detected", { autoClose: 1500 })
        setPlanName("")
        setPlanStart("")
        setPlanEnd("")
        setPlanAppName("")
      }
    }
  }

  useEffect(() => {
    const getPlan = async () => {
      const response = await Axios.get("http://localhost:5000/api/getPlan")
      console.log(response)
      setUserData(response.data)
    }
    getPlan()
  }, [])

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/getApplicationDetails/${App_Acronym}`).then(response => setUser({ ...response.data[0] }))
  }, [App_Acronym])

  return (
    <>
      <Card style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <Card.Header as="h5" style={{ textAlign: "center" }}>
          Application Information
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title className="leftright" style={{ display: "flex" }}>
                  Application: {user.App_Acronym}
                  <Card.Title className="leftright">Running Number: {user.App_Rnumber}</Card.Title>
                  <Card.Title className="leftright">Start Date: {user.App_startDate}</Card.Title>
                  <Card.Title className="leftright">End Date: {user.App_endDate}</Card.Title>
                </Card.Title>
                <br />
                <Card.Title className="leftright" style={{ display: "flex" }}>
                  App Permit Create: {user.App_permit_Create}
                  <Card.Title className="leftright">App Permit Open: {user.App_permit_Open}</Card.Title>
                  <Card.Title className="leftright">App Permit ToDo: {user.App_permit_toDoList}</Card.Title>
                  <Card.Title className="leftright">App Permit Doing: {user.App_permit_Doing}</Card.Title>
                  <Card.Title className="leftright">App Permit Closed: {user.App_permit_Done}</Card.Title>
                  <Link to="/application">
                    <a className="nav-links">
                      <ChevronLeft />
                    </a>
                  </Link>
                  <Link to="/">
                    <a className="nav-link" onClick={handleLogout}>
                      <LogOut />
                    </a>
                  </Link>
                </Card.Title>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <div className="border d-flex align-items-center justify-content-center">
        <Button variant="primary" onClick={handleShow}>
          Add Plan
        </Button>
        <Button variant="primary" onClick={handleUnShow}>
          Add Task
        </Button>
      </div>
      <Row xs={1} md={2} lg={4} xl={6} className="g-4">
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <Card style={{ marginTop: "40px" }}>
              <Card.Header>Plan Management</Card.Header>
              <Card.Body>
                <Row>
                  {userData.map((userData, k) => (
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title style={{ display: "flex" }}>
                            {userData.Plan_MVP_name}
                          </Card.Title>
                          <Card.Subtitle>
                           {userData.Plan_app_Acronym}
                          </Card.Subtitle>
                          <Card.Text>
                            Start Date: {userData.Plan_startDate}
                          </Card.Text>
                          <Card.Text>
                            End Date: {userData.Plan_endDate}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <Card style={{ marginTop: "40px" }}>
              <Card.Header>Open</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        ))}
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <Card style={{ marginTop: "40px" }}>
              <Card.Header>ToDo</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        ))}
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <Card style={{ marginTop: "40px" }}>
              <Card.Header>Doing</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        ))}
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <Card style={{ marginTop: "40px" }}>
              <Card.Header>Done</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        ))}
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <Card style={{ marginTop: "40px" }}>
              <Card.Header>Closed</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal size="xl" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ borderRadius: "100%" }}>
            <Row>
              <Form.Group as={Col} controlId="formGridPlanName">
                <Form.Label>Plan Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Plan name..."
                  autoFocus
                  value={planName}
                  onChange={e => {
                    setPlanName(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPlanAppAcronym">
                <Form.Label>Plan Application</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Plan App name..."
                  autoFocus
                  value={planAppName}
                  onChange={e => {
                    setPlanAppName(e.target.value)
                  }}
                />
              </Form.Group>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Form.Group as={Col} className="mb=3" controlId="formGridStart">
                <Form.Label>Plan Start Date</Form.Label>
                <Form.Control
                  className="input1"
                  type="date"
                  value={planStart}
                  onChange={e => {
                    setPlanStart(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEnd">
                <Form.Label>Plan End Date</Form.Label>
                <Form.Control
                  className="input2"
                  type="date"
                  value={planEnd}
                  onChange={e => {
                    setPlanEnd(e.target.value)
                  }}
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
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ borderRadius: "100%" }}>
            <Row>
              <Form.Group as={Col} controlId="formGridPlanName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control type="text" placeholder="Task name..." autoFocus />
                <Form.Group as={Col} className="mb=3" controlId="formGridStart" style={{ marginTop: "14px" }}>
                  <Form.Label>Task ID</Form.Label>
                  <Form.Control type="text" placeholder="<App_Acronym>_<App_Rnumber>" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPlanAppAcronym" style={{ marginTop: "15px" }}>
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control as="textarea" placeholder="Hello I am a durian..." rows={3} autoFocus />
                </Form.Group>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPlanAppAcronym">
                <Form.Label>Task Notes</Form.Label>
                <Form.Control as="textarea" placeholder="You want to add important notes here..." rows={12} autoFocus />
              </Form.Group>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Form.Group as={Col} className="mb=3" controlId="formGridStart">
                <Form.Label>Task Plan</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEnd">
                <Form.Label>Task Application</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridtaskState">
                <Form.Label>Task State</Form.Label>
                <Form.Control type="text" placeholder="Plan name..." autoFocus />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPlanAppAcronym">
                <Form.Label>task Creator</Form.Label>
                <Form.Control type="text" placeholder="Plan App name..." autoFocus />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPlanAppAcronym">
                <Form.Label>Task Owner</Form.Label>
                <Form.Control type="text" placeholder="Plan App name..." autoFocus />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPlanAppAcronym">
                <Form.Label>Task Created Date</Form.Label>
                <Form.Control className="input1" type="date" autoFocus />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUnClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUnClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TaskPage
