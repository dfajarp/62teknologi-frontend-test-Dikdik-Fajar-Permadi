import React from "react";
import Rating from "./Rating";
import { Badge, Button } from "react-bootstrap";
export const ListItem = ({ item, index, currentPage,itemsPerPage }) => {
    const adjustedIndex = (currentPage - 1) * itemsPerPage + index + 1;
  return (
    <div key={item.id}>
      <Button variant="light" className="d-flex">
        <div className="p-4">
          <img
            style={{ width: 200, height: 200 }}
            src={item.image_url}
            alt={item.name}
          />
        </div>
        <div className="pr-4 pt-4 pb-4 ml-1 text-start">
          <div>
            <h5>
              {adjustedIndex}. {item.name}
            </h5>
          </div>
          <div className="d-flex gap-2">
            <Rating initialRating={item.rating} maxRating={5} />{" "}
            <span className="fw-bolder">{item.rating}</span>{" "}
            <span>{"(10.2k reviews) >"}</span>
          </div>
          <div className="d-flex gap-1">
            {item.categories &&
              item.categories.map((category) => (
                <div
                  key={category.id}
                  style={{ fontSize: 13 }}
                  className="mr-2"
                >
                  <Badge bg="secondary">{category.title}</Badge>
                </div>
              ))}
            <span style={{ fontSize: 13 }}>{item.price}</span>
          </div>
          <div>
            Quis excepteur sit fugiat nulla eiusmod quis. Sint incididunt elit
            veniam excepteur fugiat voluptate nostrud pariatur exercitation esse
            elit. Consequat qui veniam esse qui culpa do deserunt reprehenderit
            anim non.
          </div>
        </div>
      </Button>
    </div>
  );
};
