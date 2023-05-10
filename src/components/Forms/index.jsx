import WrappedRegistrationForm from "./RegistrationForm";

const RenderForm = () => {
  return (
    <div style={{ display: "grid", placeItems: "center", padding: "1em" }}>
      {/* <BasicForm /> */}
      {/* <WrappedLoginForm /> */}
      <WrappedRegistrationForm />
    </div>
  );
};

export default RenderForm;
