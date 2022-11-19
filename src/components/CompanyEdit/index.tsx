import {
  useFormik,
  FormikProvider,
  FieldArray,
  FieldArrayRenderProps,
  FormikErrors,
} from "formik";
import { Form } from "react-bootstrap";

import mockProvinces from "./../../json/provinces.json";
import mockDistricts from "./../../json/districts.json";
import mockCustomers from "./../../json/customers.json";

import { useEffect, useMemo } from "react";

interface IProps {
  company: any;
  mode: string;
}

export const CompanyEdit = ({ company, mode }: IProps) => {
  const onSubmit = (values: any) => {
    console.log("-form data:", values);
  };

  const formik = useFormik<any>({
    initialValues: {
      headQuarter: {
        province: 0,
        district: 0,
      },
      customers: [],
    },
    onSubmit,
  });

  const districts = useMemo(() => {
    return mockDistricts.districts.filter(
      (d: any) => d.provinceId === Number(formik.values.headQuarter.province)
    );
  }, [formik.values.headQuarter.province]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      headQuarter: company.headQuarter,
      customers: company.customers,
    });
  }, [company]);

  return (
    <div>
      {mode === "view" && <p>{company.name}</p>}
      {mode === "update" && <input value={company.name} />}

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <p>Province:</p>
          <Form.Select
            name="headQuarter.province"
            value={formik.values.headQuarter.province}
            disabled={mode === "view"}
            onChange={formik.handleChange}
          >
            {mockProvinces.provinces.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Form.Select>

          <p>District:</p>
          <Form.Select
            name="headQuarter.district"
            value={formik.values.headQuarter.district}
            onChange={formik.handleChange}
          >
            {districts.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Form.Select>

          <p>Customers</p>
          <FieldArray name="customers">
            {(helper: FieldArrayRenderProps) => (
              <>
                {formik.values.customers.map((customer: any, index: number) => (
                  <div
                    key={index}
                    style={{ padding: 10, border: "1px solid #000" }}
                  >
                    <p>Comapy {index + 1}</p>
                    name:
                    <Form.Select
                      name={`customers[${index}].id`}
                      value={formik.values.customers[index].id}
                      onChange={formik.handleChange}
                    >
                      {mockCustomers.customers.map((p: any) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </Form.Select>
                    Description:
                    <Form.Control
                      name={`customers[${index}].description`}
                      value={formik.values.customers[index].description}
                      onChange={formik.handleChange}
                    />
                  </div>
                ))}
              </>
            )}
          </FieldArray>

          <button>Submit</button>
        </form>
      </FormikProvider>
    </div>
  );
};
