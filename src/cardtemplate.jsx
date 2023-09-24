import Card from "react-bootstrap/Card";

function CardTemplate(props) {
  return (
    <Card
      style={{ width: "18rem" }}
      bg={props.color}
      text={props.textcolor}
      className="mb-2 m-2 text-center"
    >
      <Card.Body>
        {props.title && <Card.Title>{props.title}</Card.Title>}
        {props.subtitle && (
          <Card.Subtitle className="mb-2 text-muted">
            {props.subtitle}
          </Card.Subtitle>
        )}
        {props.text && <Card.Text>{props.text}</Card.Text>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </Card.Body>
    </Card>
  );
}

export default CardTemplate;
