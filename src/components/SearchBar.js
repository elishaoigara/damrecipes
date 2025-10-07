import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={5}>
          <InputGroup className="search-bar">
            <Form.Control
              type="text"
              placeholder="✨ Enter ingredients or recipe name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <Button type="submit" className="search-btn">
              🔍 Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
