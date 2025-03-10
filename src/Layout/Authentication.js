import classes from "Layout/Authentication.module.scss";
import AuthSideContent from "Components/Authentication/AuthSideContent";
import { Outlet } from "react-router-dom";
import moreInfo from "assets/Icons/moreInfo.svg";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "Store/auth-redux";
import { useEffect, useRef } from "react";

const Authentication = () => {
  const dispatch = useDispatch();
  const timeRef = useRef(null);
  const showBackendError = useSelector((state) => state.auth.showBackendError);

  useEffect(() => {
    if (showBackendError) {
      clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => {
        dispatch(AuthActions.setShowBackendError(false));
      }, 5000);
    }else{
      clearTimeout(timeRef.current);
    }
  },[showBackendError]);

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

  return (
    <>
      {showBackendError && (
        <div className={classes.errors}>
          <img
            src={moreInfo}
            alt="more-info-icon"
            className={classes.errors_moreinfo}
          />
          <div className={classes.errors_text}>
            Invalid credentials! Email id and password do not match. Please
            check and try again
          </div>
        </div>
      )}
      <div className={classes.auth}>
        <AuthSideContent className={classes.auth_side_content} />
        <div className={classes.box}>
        <div className={`${classes.logo} text-black text-3xl font-bold`}>
        {' '}
        AI Voice
      </div>
          <div className={classes.outlet}>
            <Outlet />
          </div>
          <div className={classes.footer}>
            Voice 2025. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};
export default Authentication;
