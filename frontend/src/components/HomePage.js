import React from "react";
import "../assets/css/HomePage.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import { useState } from "react";
import axios from "axios";
import iconSet from "../selection.json";
import Results from "./Results";
import IcomoonReact from "icomoon-react";
const HomePage = () => {
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");
  const [mail, setMail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [tech, setTech] = useState([]);
  const [bool, setBool] = useState(Boolean);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setMsg("");
    setBool("");
    setMail([]);
    setPhone([]);
    setTech([]);
    e.preventDefault();
    const urls = JSON.stringify({
      url: url,
    });
    setLoading(true);
    console.log(urls);
    axios
      .post("http://localhost:8000/url/", urls, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(loading);
        setMsg(res.data[0]);
        setMail(res.data[4]);
        setPhone(res.data[5]);
        setTech(res.data[1]);
        setBool(res.data[6]);
        console.log(mail, phone, msg, tech);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        console.log(loading);
      });
  };

  return (
    <div className="mt-5 pb-5 ">
      <div className=" mx-auto pt-5">
        <h5 className="text-center fs-1 fw-bold pb-5 title">
          Entrer <em className="uColor">le lien</em> de l'entreprise
        </h5>
        <div className="d-flex justify-content-center ">
          <div className="w-50 ">
            <InputGroup className="mb-3 ">
              <Form.Control
                placeholder="'http://...'"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />

              <Button onClick={handleSubmit}>
                <div className="icon">
                  <IcomoonReact
                    iconSet={iconSet}
                    color="#ffff"
                    size={20}
                    icon="search"
                  />
                </div>{" "}
              </Button>
            </InputGroup>
          </div>
        </div>
        {loading ? (
          <div className="text-center  p-3">
            <div class="spinner-border spinnerDiv" role="status"></div>
          </div>
        ) : (
          <div className="d-flex justify-content-center p-2  ">
            <Results
              msg={msg}
              tech={tech}
              mail={mail}
              phone={phone}
              bool={bool}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
