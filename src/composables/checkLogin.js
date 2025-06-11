const checkLogin = (user, visible) => {
  if (!user.isLoggedIn) {
    console.log(visible.value);
    if (visible.value == true) {
      visible.value = false;
      setTimeout(() => {
        visible.value = true;
      }, 10);
      return false;
    }
    else {
      visible.value = true;
      return false;
    }
  }
  else {
    return true;
  }
};
export default checkLogin;