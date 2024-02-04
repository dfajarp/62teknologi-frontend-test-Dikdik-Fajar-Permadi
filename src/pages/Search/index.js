import React, { useEffect, useState } from "react";
import { ListItem, TopNav } from "../../components";
import { Row, Col, ButtonGroup, Container } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";

export const Search = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  // const [queryParams, setQueryParams] = useState({});
  const location = useLocation();

  const fetchData = async (page, params) => {
    let queryParam = "";
    for (const param in params) {
      if (params[param]) {
        // Jika nilai parameter ada, tambahkan ke queryParam dan simpan ke lokal storage
        queryParam += `${param}=${params[param]}&`;
      }
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/business/search?${queryParam}offset=${
          page * itemsPerPage
        }&limit=${itemsPerPage}`
      );
      setData(response.data.businesses);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrice = (price) => {
    // Get current URL search params
    const searchParams = new URLSearchParams(window.location.search);

    // Add or update parameter
    searchParams.set("price", price);

    // Construct the new URL with updated search params
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

    localStorage.setItem("param_price", price);
    // Navigate to the new URL
    navigate(newUrl);
    window.location.reload(); // Reload the page
  };

  const removeQueryParam = (paramNameToRemove) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete(paramNameToRemove); // Menghapus parameter yang diinginkan
    localStorage.removeItem('param_price');
    const updatedSearch = queryParams.toString();
    const newPath = updatedSearch
      ? `${window.location.pathname}?${updatedSearch}`
      : window.location.pathname;
    navigate(newPath); // Mengganti navigasi dengan URL yang diperbarui
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    const get_price = localStorage.getItem("param_price");
    if (get_price) {
      params["price"] = get_price;
      searchParams.set("price", get_price);
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      navigate(newUrl);
    }

    fetchData(currentPage, params);
  }, [location.search, currentPage]); // Perubahan currentPage dan location.search akan memicu useEffect

  return (
    <div>
      <div>
        <TopNav
          categories={localStorage.getItem("param_categories")}
          location={localStorage.getItem("param_location")}
        />
      </div>

      <div>
        <Container>
          <Row>
            <Col md={3} className=" d-flex justify-content-center">
              <div>
                <div className="mb-4">
                  <h4>Filters</h4>
                </div>
                <div className="mb-4">
                  {localStorage.getItem("param_price") ? (
                    <Button
                      variant="link"
                      onClick={() => removeQueryParam("price")}
                    >
                      Clear filter
                    </Button>
                  ) : null}
                </div>
                <div>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      onClick={() => {
                        handlePrice(1);
                      }}
                      variant="secondary"
                    >
                      $
                    </Button>
                    <Button
                      onClick={() => {
                        handlePrice(2);
                      }}
                      variant="secondary"
                    >
                      $$
                    </Button>
                    <Button
                      onClick={() => {
                        handlePrice(3);
                      }}
                      variant="secondary"
                    >
                      $$$
                    </Button>
                    <Button
                      onClick={() => {
                        handlePrice(4);
                      }}
                      variant="secondary"
                    >
                      $$$$
                    </Button>
                  </ButtonGroup>
                </div>
                <hr />
              </div>
            </Col>
            <Col md={9}>
              {data.map((item, idx) => (
                <ListItem key={item.id} item={item} index={idx} currentPage={currentPage} itemsPerPage={itemsPerPage} />
              ))}
              <div>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
