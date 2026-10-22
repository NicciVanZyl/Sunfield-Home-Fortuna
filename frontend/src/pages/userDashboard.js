import DashboardNav from "../components/dashboardNavUser";

function UserDashboard() {
  return (
    <>
      <title>User Dashboard | Sunfield Home</title>
      <meta
        name="description"
        content="See the difference you've made in Sunfield Home"
      />
      <div style={{ height: "90vh", position: "relative" }}>
        <DashboardNav></DashboardNav>
      </div>
    </>
  );
}

export default UserDashboard;
