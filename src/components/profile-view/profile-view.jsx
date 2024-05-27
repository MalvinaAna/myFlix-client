import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const ProfileView = ({ token, username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://my-movieflix-e95b2c0e9dda.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, username]);

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <p>No user data available.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>User Profile</h2>
          <div>
            <label>Username: </label>
            <span>{userData.Username}</span>
          </div>
          <div>
            <label>Email: </label>
            <span>{userData.Email}</span>
          </div>
          <div>
            <label>Birthday: </label>
            <span>{userData.Birthday}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;


  
  
  
  
  
  
  
  