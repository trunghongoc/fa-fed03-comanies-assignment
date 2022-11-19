import { MouseEvent, useEffect } from "react";
import {
  useFormik,
  FormikProvider,
  FieldArray,
  FieldArrayRenderProps,
  FormikErrors,
} from "formik";
import { ErrorMessage } from "./style";
import * as Yup from "yup";

interface IFriend {
  id: number;
  name: string;
}

interface IFormData {
  email: string;
  password: string;
  address: {
    province: string;
    district: string;
  };
  friends: IFriend[];
}

interface IFormErrors {
  email?: string;
  password?: string;
  address: {
    province?: string;
    district?: string;
  };
  friends?: string;
}

export const UserCreate = () => {
  const onSubmit = (values: IFormData) => {
    console.log("-form data:", values);
  };

  const validate = (values: IFormData) => {
    const errors: IFormErrors = {
      address: {},
    };

    if (values.password.length < 3) {
      errors.password = "Password must at least 3 charaters";
    }

    if (values.address.province !== "hn") {
      errors.address.province = "Province should be Ha Noi";
    }
    if (values.address.province.length < 3) {
      errors.address.province = "Province should be Ha Noi";
    }

    return errors;
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(3, "Must be 3 characters or greater than")
      .required("Ban chua nhap pwd"),
    email: Yup.string()
      .email("Email khong hop le")
      .required("Ban chua nhap email"),
    address: Yup.object()
      .shape({
        province: Yup.string().required(),
        district: Yup.string().required(),
      })
      .required(),
    friends: Yup.array()
      .of(
        Yup.object({
          id: Yup.number().required(),
          name: Yup.string().required(),
        })
      )
      .min(1),
  });

  const formik = useFormik<IFormData>({
    initialValues: {
      email: "a@a.com",
      password: "123456",
      address: {
        province: "Ha noi",
        district: "Cau giay",
      },
      friends: [],
    },
    // validateOnMount: true,
    validationSchema,
    onSubmit,
  });

  const addNewFriend = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const friends = formik.values.friends;
    formik.setFieldValue("friends", [
      ...friends,
      {
        id: new Date().valueOf(),
        name: "",
      },
    ]);
  };

  const removeFriend = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();

    // xoa vi tri index trong array
    // set lai friends

    console.log("--index:", index);
  };

  const setValuesAfterCallAPI = () => {
    formik.setValues({
      ...formik.values,
      friends: [
        {
          id: 1,
          name: "Friend 1",
        },
      ],
    });
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setValuesAfterCallAPI();
  //   }, 2000);
  // }, []);

  return (
    <div>
      <p>User create</p>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <pre>
            <>{console.log("-Errors", formik.errors)}</>
          </pre>
          <p>Email:</p>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          )}

          <p>Password:</p>
          <input
            type="text"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          )}

          <p>Province:</p>
          <input
            name="address['province']"
            value={formik.values.address.province}
            onChange={formik.handleChange}
          />
          {formik.errors.address?.province &&
            formik.touched.address?.province && (
              <ErrorMessage>{formik.errors.address?.province}</ErrorMessage>
            )}

          <p>District:</p>
          <input
            type="text"
            name="address[district]"
            value={formik.values.address.district}
            onChange={formik.handleChange}
          />
          {formik.errors.address?.district &&
            formik.touched.address?.district && (
              <ErrorMessage>{formik.errors.address?.district}</ErrorMessage>
            )}

          <p>Friends:</p>
          <FieldArray name="friends">
            {(helper: FieldArrayRenderProps) => (
              <>
                <button
                  onClick={() =>
                    helper.push({
                      id: 1234,
                      name: "",
                    })
                  }
                >
                  Add new friend
                </button>

                <div>
                  {formik.values.friends.map((friend, index) => (
                    <div key={index}>
                      <p>Friend o vi tri {index}</p>
                      <input
                        type="text"
                        name={`friends[${index}].id`}
                        value={formik.values.friends[index].id}
                        onChange={formik.handleChange}
                      />
                      {/* {formik.errors.friends[index].id &&
                        formik.touched.friends[index].id && (
                          <ErrorMessage>
                            {formik.errors.friends[index.id]}
                          </ErrorMessage>
                        )} */}
                      {typeof formik.errors.friends?.[index] === "object" &&
                        (
                          formik.errors.friends?.[
                            index
                          ] as FormikErrors<IFriend>
                        )?.id &&
                        formik.touched.friends?.[index]?.id && (
                          <ErrorMessage>
                            {
                              (
                                formik.errors.friends?.[
                                  index
                                ] as FormikErrors<IFriend>
                              ).id
                            }
                          </ErrorMessage>
                        )}

                      <input
                        type="text"
                        name={`friends[${index}].name`}
                        value={formik.values.friends[index].name}
                        onChange={formik.handleChange}
                      />
                      {typeof formik.errors.friends?.[index] === "object" &&
                        (
                          formik.errors.friends?.[
                            index
                          ] as FormikErrors<IFriend>
                        )?.name &&
                        formik.touched.friends?.[index]?.name && (
                          <ErrorMessage>
                            {
                              (
                                formik.errors.friends?.[
                                  index
                                ] as FormikErrors<IFriend>
                              )?.name
                            }
                          </ErrorMessage>
                        )}
                      <button onClick={(event) => removeFriend(event, index)}>
                        XOA friend
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </FieldArray>
          {formik.errors.friends &&
            typeof formik.errors.friends === "string" &&
            formik.touched.friends && (
              <ErrorMessage>{formik.errors.friends}</ErrorMessage>
            )}

          <button>Submit</button>
        </form>
      </FormikProvider>
    </div>
  );
};
