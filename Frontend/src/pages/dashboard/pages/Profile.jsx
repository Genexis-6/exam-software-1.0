import "../css/profile.css";
import testing from "../../../assets/images/background-img.jpg";
import { UserCircle } from "lucide-react";

export default function Profile() {
  return (
    <div className="home profile">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-6 ">
            <div className="row mt-3">
              <div className="col-12 profile-pic">
                <img src={testing} alt="profile picture" />
              </div>
              <div className="col-12 mt-2 text-center text-success">
                <p>
                  <UserCircle /> username
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-6">
            <div className="row">
              <div className="col-12 description-section">
                <div className="row">
                  <div className="col-12 mt-2">
                    <h4 className="text-success text-center">Descriptions</h4>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12">
                        <label htmlFor="">First name</label>
                      </div>
                      <div className="col-12">
                        <input type="text" className="w-100" readOnly />
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-12 mt-2">
                        <label htmlFor="">Last name</label>
                      </div>
                      <div className="col-12">
                        <input type="text" className="w-100" readOnly />
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-12 mt-2">
                        <label htmlFor="">Email</label>
                      </div>
                      <div className="col-12">
                        <input type="email" className="w-100" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-2">
                    <h4 className="text-success text-center">Result starts</h4>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="row">
                        <div className="col-2 text-success fw-bold">
                            <p>Search</p>
                        </div>
                        <div className="col-6">
                            <input type="text" name="" id="" placeholder="search" />
                        </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">S/N</th>
                          <th scope="col">Subject Name</th>
                          <th scope="col">Eaxm</th>
                          <th scope="col">Score</th>
                           <th scope="col">Time Spent</th>
                            <th scope="col">Question Answered</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
