import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const CategoryCard = ({ title, data }) => {
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <ListGroup variant="flush">
        {data.map((item) => (
          <ListGroup.Item key={item.id}>
            {item.name}: {item.count}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default CategoryCard;