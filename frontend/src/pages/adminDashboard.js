import DashboardNav from "../components/dashboardNavAdmin";

function AdminDashboard() {
  return (
    <>
      <title>Admin Dashboard | Sunfield Home</title>
      <meta
        name="description"
        content="View what's happening in Sunfield home "
      />
      <div style={{ height: "90vh", position: "relative" }}>
        <DashboardNav></DashboardNav>
      </div>
    </>
  );
}

export default AdminDashboard;
