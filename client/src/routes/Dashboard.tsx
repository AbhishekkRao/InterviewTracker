import JobsTable from "./../components/JobsTable.tsx";

const Dashboard = () => {
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.reload(true);
  };

  return (
    <div className="mx-20 mt-10 flex flex-col gap-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <JobsTable />
    </div>
  );
};

export default Dashboard;
