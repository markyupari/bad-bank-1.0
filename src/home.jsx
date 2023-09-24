import { UserContext } from "./context";
import { useContext } from "react";
import CardTemplate from "./cardtemplate";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

function Home() {
  const user = useContext(UserContext);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <CardTemplate
            color="secondary"
            textcolor="white"
            title="BadBank landing page"
            subtitle="Welcome to your BadBank"
            text="We strongly recommend not using this bank"
            body={
              <Card.Img
                variant="top"
                className="img-fluid"
                src="./src/assets/bank_logo.png"
                alt="Bank Logo image"
              />
            }
          />
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
