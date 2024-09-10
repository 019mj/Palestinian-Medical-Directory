import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, ref } from "firebase/database";
import { database } from "../../service/firebase";
import RatingDialog from "../RatingDialog/RatingDialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";

export default function DoctorProfile() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(false);
  
    useEffect(() => {
      const fetchDoctorData = async () => {
        const doctorRef = ref(database, `doctors/${id}`);
        const snapshot = await get(doctorRef);
        if (snapshot.exists()) {
          setDoctor(snapshot.val());
        }
      };
      fetchDoctorData();
    }, [id]);
  
    const handleViewReview = (review) => {
      setSelectedReview(review);
      setIsReadOnly(true);
      setShowDialog(true);
    };
  
    const handleNewReview = (newReview) => {
      setDoctor((prevDoctor) => ({
        ...prevDoctor,
        reviews: {
          ...prevDoctor.reviews,
          [Date.now()]: newReview,
        },
      }));
    };
  
    const renderRatingDialog = () => (
      <RatingDialog
        doctorId={id}
        visible={showDialog}
        setVisible={setShowDialog}
        isReadOnly={isReadOnly}
        initialStars={selectedReview?.stars || null}
        initialNotes={selectedReview?.notes || ""}
        onSave={handleNewReview}
      />
    );
  
    const headerTemplate = (
      <div className="p-card-title" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
        {doctor?.name}
      </div>
    );
  
    return doctor ? (
      <div style={{ margin: '20px auto', maxWidth: '800px' }}>
        <Card header={headerTemplate} className="p-shadow-5" style={{ marginBottom: '2rem', backgroundColor: '#f4f4f4', padding: '1.5rem' }}>
          <div style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#555' }}>
            <p><strong>Address:</strong> {doctor.address}</p>
            <p><strong>Major:</strong> {doctor.major}</p>
            <p><strong>Phone:</strong> {doctor.phone_number}</p>
          </div>
  
          <Panel header="Average Rating" className="p-shadow-3" style={{ textAlign: "center", marginBottom: "1rem" }}>
            {doctor.reviews ? (
              <Rating value={calculateAverage(doctor.reviews)} readOnly stars={5} cancel={false} />
            ) : (
              <p>No reviews yet</p>
            )}
          </Panel>
  
          <Button label="Add Review" icon="pi pi-plus" className="p-button-success" onClick={() => {
            setSelectedReview(null);
            setIsReadOnly(false);
            setShowDialog(true);
          }} />
          {renderRatingDialog()}
        </Card>
  
        <DataTable value={doctor.reviews ? Object.values(doctor.reviews) : []} paginator rows={5}>
          <Column field="date" header="Date" />
          <Column
            field="stars"
            header="Rating"
            body={(rowData) => <Rating value={rowData.stars} readOnly stars={5} cancel={false} />}
          />
          <Column
            field="notes"
            header="Notes"
            body={(rowData) => (
              rowData.notes ? <Button label="View" onClick={() => handleViewReview(rowData)} /> : "No notes"
            )}
          />
        </DataTable>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
  

function calculateAverage(reviews) {
    console.log(reviews);
    
  const total = Object.values(reviews).reduce((acc, review) => acc + review.stars, 0);
  return total / Object.values(reviews).length;
}
