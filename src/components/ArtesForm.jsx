import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";

import { useArte } from "../contexts/FoodContext";
import api from "../services/api";

function ArtesForm() {
  const { artes, isShowArteForm, setArtes, toggleArteForm } = useArte();  ////Trazendo referĂȘncias armazenadas no ObjetosContext.jsx

  const onSubmit = async (food) => {
    const novaArte = await api.create(food);

    setArtes([...artes, novaArte]);

    toggleArteForm();
  };

  return (
    <Modal show={isShowArteForm} onHide={toggleArteForm}>
      <Modal.Header closeButton>
        <Modal.Title as="h5">Nova Comida</Modal.Title>
      </Modal.Header>
      <Formik initialValues={{ name: "", image: "" }} onSubmit={onSubmit}>
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="formFoodName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.name}
                />
              </Form.Group>
              <Form.Group controlId="formFoodImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  name="image"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.image}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleArteForm}>
                Fechar
              </Button>
              <Button
                variant="primary"
                as="input"
                type="submit"
                value="Confirmar"
              />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default ArtesForm;
