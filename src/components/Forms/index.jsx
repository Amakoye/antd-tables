import FormModalPage from "./FormModal";

const RenderForm = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        padding: "1em",
        height: "100vh",
      }}
    >
      {/* <WrappedBasicForm /> */}
      {/* <WrappedLoginForm /> */}
      {/* <WrappedRegistrationForm /> */}
      {/*  <WrappedAdvancedSearch /> */}
      <FormModalPage />
    </div>
  );
};

export default RenderForm;
