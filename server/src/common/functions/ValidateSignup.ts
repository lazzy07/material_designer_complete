export const validateEmail = (email: string): boolean => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(email.toLowerCase());
};

export const validateSignupUser = (
  fName: string,
  lName: string,
  userName: string,
  email: string,
  password: string
) => {
  if (fName.trim().length > 0) {
    if (lName.trim().length > 0) {
      if (userName.length >= 4) {
        if (userName.match("^[A-z0-9]+$")) {
          if (validateEmail(email)) {
            if (password.trim().length >= 6) {
              return { error: false, message: "" };
            } else {
              return {
                error: true,
                data: {
                  type: "password",
                  message: "Password must be atleast 6 characters long"
                }
              };
            }
          } else {
            return {
              error: true,
              data: { type: "email", message: "Please enter a valid email" }
            };
          }
        } else {
          return {
            error: true,
            data: {
              type: "userName",
              message: "Username can only contain numbers and letters"
            }
          };
        }
      } else {
        return {
          error: true,
          data: {
            type: "userName",
            message: "Username must be atleast 4 characters long"
          }
        };
      }
    } else {
      return {
        error: true,
        data: { type: "lName", message: "Last name can't be empty" }
      };
    }
  } else {
    return {
      error: true,
      data: { type: "fName", message: "First name can't be empty" }
    };
  }
};

export const validateSignupCompany = (
  fName: string,
  lName: string,
  userName: string,
  email: string,
  password: string
) => {
  if (fName.trim().length > 0) {
    // if (lName.trim().length > 0) {
    if (userName.length >= 4) {
      if (userName.match("^[A-z0-9]+$")) {
        if (validateEmail(email)) {
          if (password.trim().length >= 6) {
            return { error: false, message: "" };
          } else {
            return {
              error: true,
              data: {
                type: "password",
                message: "Password must be atleast 6 characters long"
              }
            };
          }
        } else {
          return {
            error: true,
            data: { type: "email", message: "Please enter a valid email" }
          };
        }
      } else {
        return {
          error: true,
          data: {
            type: "userName",
            message: "Username can only contain numbers and letters"
          }
        };
      }
    } else {
      return {
        error: true,
        data: {
          type: "userName",
          message: "Username must be atleast 4 characters long"
        }
      };
    }
    // } else {
    //   return {
    //     error: true,
    //     data: { type: "lName", message: "Last name can't be empty" }
    //   };
    // }
  } else {
    return {
      error: true,
      data: { type: "fName", message: "First name can't be empty" }
    };
  }
};
