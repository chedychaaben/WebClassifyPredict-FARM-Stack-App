import React from "react";
import iconSet from "../selection.json";
import IcomoonReact from "icomoon-react";
export default function Results({ msg, tech, mail, phone, bool }) {
  return (
    <>
      {msg.length > 0 && (
        <div className="p-3 w-50 shadow rounded-2">
          <div className="p-2">
            <h5 className="text-center">
              <IcomoonReact
                iconSet={iconSet}
                color={bool ? "#86BC26" : "#E0004D"}
                size={30}
                icon={bool ? "checkmark" : "cross"}
              />{" "}
              {msg}
            </h5>
          </div>
          {tech.length > 0 && (
            <div class="container p-2">
              <h6 className="pl-1">
                {/* <IcomoonReact
                  iconSet={iconSet}
                  color="#86BC26"
                  size={20}
                  icon="display"
                />
                {"    "} */}
                Technologie:
              </h6>
              <div className=" ">
                <div className="row ">
                  {tech.map((t) => (
                    <div className="col-md-2 text-center shadow-sm m-2 p-1">
                      <div>{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {mail.length > 0 && (
            <div class="container p-2">
              <h6 className="pl-1">
                {"    "}
                Mail:
              </h6>
              <div className=" ">
                <div className="row ">
                  {mail.map((m) => (
                    <div className="col-sm-5 text-center  m-2 p-1">
                      <div>
                        <IcomoonReact
                          iconSet={iconSet}
                          color="#86BC26"
                          size={10}
                          icon="envelop"
                        />
                        {"  "}
                        {m}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {phone.length > 0 && (
            <div class="container p-2">
              <h6 className="pl-1">Phone:</h6>

              <div className="row  ">
                {phone.map((p) => (
                  <div className="col-md-3 text-center  m-2 p-1">
                    <div>
                      {" "}
                      <IcomoonReact
                        iconSet={iconSet}
                        color="#86BC26"
                        size={10}
                        icon="phone"
                      />{" "}
                      {p}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
