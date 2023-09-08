import React, { useContext, useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Loadingspinner from "../components/Loadingspinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser } from "../services/allApis";
import { registerContext } from "../components/ContextShare";
import { useNavigate } from "react-router-dom";

function Add() {
  const { registerData, setRegisterData } = useContext(registerContext);
  const navigate = useNavigate();

  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];
  const [showSpin, setShowSpin] = useState(true);
  const [normalUserInputs, setNormalUserInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState("");
  const getandsetUserNormalInputs = (e) => {
    const { name, value } = e.target;
    setNormalUserInputs({ ...normalUserInputs, [name]: value });
  };
  console.log(normalUserInputs);
  console.log(status);
  console.log(profile);

  useEffect(() => {
    if (profile) {
      setPreview(URL.createObjectURL(profile));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 2000);
  }, [profile]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = normalUserInputs;
    if (
      !fname ||
      !lname ||
      !email ||
      !mobile ||
      !gender ||
      !location ||
      !status ||
      !profile
    ) {
      toast.warning("Please fill the form");
    } else {
      // toast.success("Form completed")
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("profile", profile);
      data.append("location", location);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      // make api call
      const result = await addUser(data, headers);
      console.log(result);
      if (result.status === 200) {
        setNormalUserInputs({
          ...normalUserInputs,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
        });
        setStatus("");
        setProfile("");
        setRegisterData(result.data)
        navigate("/");
      } else {
        toast.error("Request failed");
      }
    }
  };
  return (
    <>
      {showSpin ? (
        <Loadingspinner></Loadingspinner>
      ) : (
        <div className="container mt-5">
          <h1 className="text-center fw-bolder">Add New Employee Details</h1>
          <div className="shadow rouded border p-2 mt-3">
            <div className="image w-100 text-center">
              <img
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
                src={
                  preview
                    ? preview
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt=""
              />
            </div>
            <Form>
              <Row>
                <FloatingLabel
                  controlId="floatingInputname"
                  label="First Name"
                  className="mb-3 col-lg-6"
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="fname"
                    value={normalUserInputs.fname}
                    onChange={(e) => getandsetUserNormalInputs(e)}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInputname"
                  label="Last Name"
                  className="mb-3 col-lg-6"
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    value={normalUserInputs.lname}
                    onChange={(e) => getandsetUserNormalInputs(e)}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInputemail"
                  label="Employee Email"
                  className="mb-3 col-lg-6"
                >
                  <Form.Control
                    type="email"
                    placeholder="Employee Email"
                    name="email"
                    value={normalUserInputs.email}
                    onChange={(e) => getandsetUserNormalInputs(e)}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInputMobile"
                  label="Employee Mobile"
                  className="mb-3 col-lg-6"
                >
                  <Form.Control
                    type="Number"
                    placeholder="Employee Mobile"
                    name="mobile"
                    value={normalUserInputs.mobile}
                    onChange={(e) => getandsetUserNormalInputs(e)}
                  />
                </FloatingLabel>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    name={"gender"}
                    value={"Male"}
                    label={"Male"}
                    onChange={(e) => getandsetUserNormalInputs(e)}
                  />
                  <Form.Check
                    type={"radio"}
                    name={"gender"}
                    value={"Female"}
                    label={"Female"}
                    onChange={(e) => getandsetUserNormalInputs(e)}
                  />
                  <Form.Check
                    type={"radio"}
                    name={"gender"}
                    value={"Other"}
                    label={"Other"}
                    onChange={(e) => getandsetUserNormalInputs(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select Employee Status</Form.Label>
                  <Select
                    options={options}
                    onChange={(e) => setStatus(e.value)}
                  ></Select>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Choose Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    onChange={(e) => setProfile(e.target.files[0])}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Employee Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={normalUserInputs.location}
                    onChange={(e) => getandsetUserNormalInputs(e)}
                  ></Form.Control>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" />
    </>
  );
}

export default Add;
