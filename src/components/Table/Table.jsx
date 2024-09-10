import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { doctors as fetchedDoctors } from "../../service/DoctorsService";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom"; 
import { DocContext } from "../../store/doctors-cnxt";
import { useContext, useState } from "react";
import { Button } from "primereact/button";
import RatingDialog from "../RatingDialog/RatingDialog.jsx";

export default function Table() {
  const { filter } = useContext(DocContext);
  const [visibleDoctorId, setVisibleDoctorId] = useState(null);
  const navigate = useNavigate();

  function actionBodyTemplate(rowData) {
    return (
      <div>
        <Button
          icon="pi pi-star"
          className="p-button-rounded p-button-text p-button-success"
          onClick={() => setVisibleDoctorId(rowData.id)}
          tooltip="Rate"
        />

        {visibleDoctorId === rowData.id && (
          <RatingDialog
            doctorId={rowData.id}
            visible={visibleDoctorId === rowData.id}
            setVisible={() => setVisibleDoctorId(null)}
          />
        )}

        <Button
          icon="pi pi-user"
          className="p-button-rounded p-button-text p-button-info"
          onClick={() => navigate(`/doctor/${rowData.id}`)}
          tooltip="Doctor Information"
        />
      </div>
    );
  }

  function getDoctors(doctors) {
    return doctors.filter(
      (doctor) =>
        (!filter.name ||
          doctor.name.toLowerCase().includes(filter.name.toLowerCase())) &&
        (!filter.city || filter.city === doctor.city) &&
        (!filter.major || filter.major === doctor.major)
    );
  }

  const doctors = getDoctors(fetchedDoctors);

  return (
    <div className={styles.card}>
      <DataTable
        value={doctors}
        paginator
        rowsPerPageOptions={[5, 10, 15, 50]}
        rows={10}
        dataKey="id"
        removableSort
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        emptyMessage="No Doctors Found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column field="address" minWidth="25%" sortable header="Address" />
        <Column field="major" minWidth="25%" sortable header="Major" />
        <Column field="name" minWidth="25%" sortable header="Name" />
        <Column
          field="phone_number"
          minWidth="25%"
          sortable
          header="Phone NO."
        />
        <Column field="city" minWidth="25%" sortable header="City" />
        <Column body={actionBodyTemplate} minWidth="25%" header="Rating" />
      </DataTable>
    </div>
  );
}
