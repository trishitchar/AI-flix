export const checkValidDataSignIn = (email, password) => {
    const emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const passwordValidate = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password);

    if (!emailValidate) return "Email is not Valid";
    if (!passwordValidate) return "Password is not Valid";

    return null;
  };
  
  export const checkValidDataSignUp = (name, email, password) => {
    const emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const passwordValidate = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password);
    const nameValidate = name !== "" && name !== undefined;
  
    if (!nameValidate) return "Name is not Valid";
    if (!emailValidate) return "Email is not Valid";
    if (!passwordValidate) return "Password must contain 6 digits one symbol, one capital letter";

    return null;

  };
  