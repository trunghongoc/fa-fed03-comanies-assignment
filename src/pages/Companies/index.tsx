import { useMemo, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

import { CompanyEdit } from "../../components/CompanyEdit";

import "./style.scss";

import mockCompanies from "./../../json/companies.json";
import mockCustomers from "./../../json/customers.json";
import mockProvinces from "./../../json/provinces.json";
import mockDistricts from "./../../json/districts.json";

export const Companies = () => {
  const [companies, setCompanies] = useState<any>(mockCompanies.companies);
  const [selectedDeleteCompany, setSelectedDeleteCompany] = useState<any>(null);
  const [selectedEditCompany, setSelectedEditCompany] = useState<any>(null);
  const [showPopUpConfirmDelete, setShowPopUpConfirmDelete] = useState(false);
  const [showPopUpConfirmEdit, setShowPopUpConfirmEdit] = useState(false);

  const getCustomerName = (id: number) => {
    const customer = mockCustomers.customers.find((c) => c.id === id);

    return customer ? customer.name : "";
  };

  const companiesFormated = useMemo(() => {
    return companies.map((company: any) => {
      const province = mockProvinces.provinces.find(
        (p) => p.id === company.headQuarter.province
      );
      const provinceName = province ? province.name : "";

      const customers = company.customers.map((customer: any) => {
        const c = getCustomerName(customer.id);

        return c;
      });

      return {
        ...company,
        headQuarterAddress: provinceName,
        customerList: customers.join(", "),
      };
    });
  }, [companies]);

  const confirmDelete = (company: any) => {
    setShowPopUpConfirmDelete(true);
    setSelectedDeleteCompany(company);
  };

  const deleteCompany = () => {
    const newCompanies = companies.filter(
      (company: any) => company.id !== selectedDeleteCompany.id
    );

    setCompanies(newCompanies);
    setShowPopUpConfirmDelete(false);
    setSelectedDeleteCompany(null);
  };

  const confirmEdit = (company: any) => {
    setShowPopUpConfirmEdit(true);
    setSelectedEditCompany(company);
  };

  const updateCompany = () => {};

  return (
    <div>
      <p>Companies</p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Head quarter</th>
            <th>Customers</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companiesFormated.map((company: any, index: number) => (
            <tr key={index}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.headQuarterAddress}</td>
              <td>{company.customerList}</td>
              <td>
                <Button onClick={() => confirmEdit(company)}>Edit</Button>

                <Button variant="danger" onClick={() => confirmDelete(company)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showPopUpConfirmDelete}
        onHide={() => setShowPopUpConfirmDelete(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa?</Modal.Title>
        </Modal.Header>

        <Modal.Body>Bạn có chắc chắn muốn xóa company này không?</Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPopUpConfirmDelete(false)}
          >
            NO
          </Button>

          <Button variant="primary" onClick={deleteCompany}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPopUpConfirmEdit}
        onHide={() => setShowPopUpConfirmEdit(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit company</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CompanyEdit mode="view" company={selectedEditCompany} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
